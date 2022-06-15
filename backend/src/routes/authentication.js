const express = require('express');
const router = express.Router();
const pool = require('../database');

const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

// SIGNUP
router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/tablero',
    failureRedirect: '/signup',
    failureFlash: true
}));

// SINGIN
router.get('/signin', (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
    req.check('username', 'Username is Required').notEmpty();
    req.check('password', 'Password is Required').notEmpty();
    const errors = req.validationErrors();
    if (errors.length > 0) {
        req.flash('error', errors[0].msg);
        res.redirect('/signin');
    }
    passport.authenticate('local.signin', {
        successRedirect: '/tablero',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/auth/facebook',
    passport.authenticate('facebook', {
        scope: ['profile', 'email']
    })
);
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/tablero',
        failureRedirect: '/signup',
        failureFlash: true
    }));

router.get('/auth/google',
    passport.authenticate('google', {
        scope: [' profile ', 'email'],
        ancho: 240,
        altura: 50,
        theme: 'oscuro'
    }));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/tablero',
        failureRedirect: '/signup',
        failureFlash: true
    })
);
router.get('/auth/soat/callback', (req, res) => {
    console.log(req.params)
});
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});
router.get('/ordendeservicio', async(req, res) => {
    let qery = `SELECT 
    o.id, 
    r.id idreserva, 
    r.title, 
    r.start, 
    r.partida, 
    r.destino, 
    r.pax,
    r.vuelo,
    r.idavuelta,
    r.observaciones,
    r.pasajeros, 
    u.id idchofer, 
    u.fullname, 
    u.movil,
    u.imagen, 
    v.id idcar, 
    v.placa,
    v.marca,
    v.clase,
    v.linea,
    v.modelo, 
    v.img,
    v.transportadora FROM ordenesdeservicio o  
    INNER JOIN reservas r ON o.reserva = r.id
    INNER JOIN users u ON o.conductor = u.id
    INNER JOIN vehiculos v ON o.vehiculo = v.id WHERE o.id = ?`
    const re = { id: req.query.id || '' };
    const orden = await pool.query(qery, re.id);
    res.render('ordendeservicio', { orden });
});
router.get('/tablero', isLoggedIn, async(req, res) => {
    const links = await pool.query(`SELECT MONTH(start) Mes, COUNT(*) CantMes, SUM(valor) venta, SUM(pax) pax 
    FROM reservas WHERE YEAR(start) = YEAR(CURDATE()) AND MONTH(start) BETWEEN 1 and 12
    GROUP BY MONTH(start)
    ORDER BY 1`);
    const clients = await pool.query(`SELECT title, COUNT(*) CantMes, SUM(valor) venta, SUM(pax) pax 
    FROM reservas WHERE cliente IS NOT NULL AND YEAR(start) = YEAR(CURDATE()) AND MONTH(start) BETWEEN 1 and 12 GROUP BY title ORDER BY 1`);



    res.render('tablero', { links });
});
router.post('/tablero2', isLoggedIn, async(req, res) => {
    //SELECT MONTH(v.fechadecompra) Mes, COUNT(*) CantMes, FORMAT(SUM(p.precio),2) venta d
    const links = await pool.query(`SELECT MONTH(v.fechadecompra) Mes, COUNT(*) CantMes, SUM(p.precio) venta, SUM(p.utilidad) utilidad, c.nombre usari
  FROM ventas v 
  INNER JOIN clientes c ON v.client = c.id 
  INNER JOIN users u ON v.vendedor = u.id
  INNER JOIN products p ON v.product = p.id
  INNER JOIN pines pi ON u.pin = pi.id
  WHERE pi.usuario = ?
      AND YEAR(v.fechadecompra) = YEAR(CURDATE()) 
      AND MONTH(v.fechadecompra) BETWEEN 1 and 12
  GROUP BY MONTH(v.fechadecompra)
  ORDER BY 1`, [req.user.id]);
    res.send(links);
    console.log(links);
});

module.exports = router;