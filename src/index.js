const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
//const {Builder, By, Key, until} = require('selenium-webdriver');
const val = require('../navegacion.js');
const sms = require('./sms.js');
const { database, Calendario } = require('./keys');
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

const transpoter = nodemailer.createTransport({
    host: 'smtp.hostinger.co',
    port: 587,
    secure: false,
    auth: {
        user: 'suport@tqtravel.co',
        pass: '123456789'
    },
    tls: {
        rejectUnauthorized: false
    }
})

// Intializations
const app = express();
require('./lib/passport');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

// Middlewares : significa cada ves que el usuario envia una peticion
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  secret: 'faztmysqlnodemysql',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(validator());

// Global variables
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.info = req.flash('info');
  app.locals.warning = req.flash('warning');
  app.locals.error = req.flash('error');
  app.locals.regis = req.regis;
  app.locals.user = req.user;
  next();
});

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));
app.use(require('../navegacion'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting
app.listen(app.get('port'), () => {
  console.log('Server is in port', app.get('port'));
  
});
//console.log(Calendario);


// Si modifica estos ámbitos, elimine token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// El archivo token.json almacena los tokens de acceso y actualización del usuario, y es
// creado automáticamente cuando se completa el flujo de autorización para el primer
// hora.
const TOKEN_PATH = 'token.json';

// Cargar secretos de clientes desde un archivo local.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error al cargar el archivo secreto del cliente:', err);
  // Autorice a un cliente con credenciales, luego llame a la API de Google Calendar.
  authorize(JSON.parse(content), listEvents);
});

/**
 * * Cree un cliente OAuth2 con las credenciales dadas y luego ejecute el
 * dada la función de devolución de llamada.
 * @param {Object} credenciales Las credenciales del cliente de autorización.
 * @param {function} callback La devolución de llamada para llamar con el cliente autorizado.
 */
function authorize(Calendario, callback) {
  const {client_secret, client_id, redirect_uris} = Calendario;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Comprueba si previamente hemos almacenado un token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * * Obtenga y almacene un nuevo token después de solicitar la autorización del usuario, y luego
 * ejecuta la devolución de llamada dada con el cliente OAuth2 autorizado.
 * @param {google.auth.OAuth2} oAuth2Client El cliente OAuth2 para obtener el token.
 * @param {getEventsCallback} devolución de llamada La devolución de llamada para el cliente autorizado.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Autorice esta aplicación visitando esta url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Ingrese el código de esa página aquí: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error al recuperar el token de acceso', err);
      oAuth2Client.setCredentials(token);
      // Almacenar el token en el disco para posteriores ejecuciones del programa
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token almacenado en', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Enumera los próximos 10 eventos en el calendario principal del usuario.
 * @param {google.auth.OAuth2} auth Un cliente OAuth2 autorizado.
 */
function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('La API devolvió un error: ' + err);
    const events = res.data.items;
    if (events.length) {
      console.log('Próximos 10 eventos:');
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No se encontraron eventos próximos.');
    }
  });
}