const express = require('express');
//const {Builder, By, Key, until} = require('selenium-webdriver');
const router = express.Router();
const crypto = require('crypto');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const sms = require('../sms.js');
const { registro } = require('../keys');
const request = require('request');
const axios = require('axios');
//const moment = require('moment');
const moment = require('moment-timezone');
moment.locale('es');



router.get('/calendario', async (req, res) => {
    const clientes = await pool.query(`SELECT * FROM clientes`);
    res.render('links/calendario', { clientes });
});

router.get('/reservas', async (req, res) => {
    let start = req.query.start || '2018-01-30',
        end = req.query.end || '2025-12-31'

        console.log(req.query)
    const reservas = await pool.query(`SELECT 
    r.id, 
    r.title,
    r.cliente, 
    r.pax, 
    r.start,
    r.ruta, 
    r.partida, 
    r.destino, 
    r.vuelo, 
    r.idavuelta,
    r.grupo, 
    r.observaciones,
    r.adicionales, 
    r.pasajeros,  
    r.valor, 
    r.creador,
    r.factura, 
    u.fullname,
    r.fecha 
    FROM reservas r INNER JOIN users u ON r.usuario = u.id WHERE start BETWEEN '${start}' AND '${end}'
    ORDER BY start`);
    // console.log(reservas)
    res.send(reservas);
});
/*$resul = false;
$start = (isset($_GET['start'])) ? $_GET['start'] : '2018-01-30';
$end = (isset($_GET['end'])) ? $_GET['end'] : '2019-12-31';

$sql = "SELECT * FROM reservas WHERE start BETWEEN '$start' AND '$end'";
$statement = $conexion -> prepare($sql);
$statement -> execute();
$resul = $statement -> fetchAll(PDO:: FETCH_ASSOC);
//echo "$start / $end / $sql";
echo json_encode($resul, JSON_UNESCAPED_UNICODE);
//print_r($resul);
break;*/

router.get('/calendar', isLoggedIn, (req, res) => {
    res.render('links/calendar');
});
router.get('/reportes', isLoggedIn, async (req, res) => {
    res.render('links/reportes');
});
router.get('/facturas', isLoggedIn, async (req, res) => {
    res.render('links/facturas');
});
router.get('/factura', isLoggedIn, async (req, res) => {
    const { id, fecha, cliente, nreservas, reservas, total } = req.query;
    const datosc = { id, fecha, cliente, nreservas, reservas, total };
    const reservs = reservas.split("-").filter(e => e).join(', ');
    const reserv = await pool.query(`SELECT * FROM  reservas WHERE id IN(${reservs})`);
    const client = await pool.query(`SELECT * FROM clientes WHERE id = ? OR nombre = ?`, [reserv[0].cliente, cliente]);
    reserv.map((t) => {
        o = moment(t.start).tz("America/New_York")
        t.start = o.utc().format();
        t.pasajeros = t.pasajeros.split(',')[0]
    });
    res.render('links/factura', { datosc, client, reserv });
});
router.post('/generarafactura', async (req, res) => {
    const data = req.body
    const { reservas } = data;
    const reservs = reservas.split("-").filter(e => e).join(', ');
    const factura = await pool.query(`INSERT INTO facturas set ?`, data);

    await pool.query(`UPDATE reservas SET factura = ${factura.insertId} WHERE id IN(${reservs})`);
    res.send(true);
});
router.post('/eliminarfactura', async (req, res) => {
    const { id, reservas } = req.body;
    const reservs = reservas.split("-").filter(e => e).join(', ');
    await pool.query(`UPDATE reservas SET factura = NULL WHERE id IN(${reservs})`);
    await pool.query(`DELETE FROM facturas WHERE id = ?`, id);
    res.send(true);
});
router.post('/report', async (req, res) => {
    let start = req.query.start || '2020-01-01',
        end = req.query.end || '2025-12-31'
    const reservs = await pool.query(`SELECT * FROM reservas WHERE factura IS NULL AND start BETWEEN '${start}' AND '${end}'`);
    respuesta = { "data": reservs };
    res.send(respuesta);
});
router.post('/report2', async (req, res) => {
    let start = req.query.start || '2020-01-01',
        end = req.query.end || '2025-12-31'
    const reservs = await pool.query(`SELECT * FROM reservas WHERE start BETWEEN '${start}' AND '${end}'`);
    respuesta = { "data": reservs };
    res.send(respuesta);
});
router.post('/fact', async (req, res) => {
    let start = req.query.start || '2019-01-01',
        end = req.query.end || '2025-12-31'
    const facturas = await pool.query(`SELECT * FROM facturas WHERE fecha BETWEEN '${start}' AND '${end}'`);
    facturar = { "data": facturas };
    res.send(facturar);
});
// Orden de servicio
router.get('/ordendeservicio', isLoggedIn, async (req, res) => {
    const redire = {
        id: req.query.id || '',
        title: req.query.title || ''
    };
    const comprovar = await pool.query(`SELECT * FROM ordenesdeservicio WHERE reserva = ?`, redire.id);
    if (comprovar.length) {
        req.flash('error', 'No se pueden generar dos ordenes de servicio para la misma reserva, ingresa a ordenes de servicio y editala');
        res.redirect('/links/calendario');
    } else {
        const conductores = await pool.query(`SELECT * FROM users WHERE categoria = 6`);
        const vehiculos = await pool.query(`SELECT * FROM vehiculos`);
        res.render('links/ordendeservicio', { conductores, vehiculos, redire });
    }
});
router.get('/orden', isLoggedIn, async (req, res) => {
    let qery = `SELECT 
    o.id, 
    r.id idreserva, 
    r.title, 
    r.start, 
    r.fecha,
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
    INNER JOIN vehiculos v ON o.vehiculo = v.id`
    const r = { id: req.query.id || '', f: req.query.f || '' };

    if (r.id.length) {
        qery += ' WHERE o.id = ?'
        const orden = await pool.query(qery, r.id);
        // orden[0].start = moment.utc(r.f).format('LLL');
        const imag = { i: `http://api.qrserver.com/v1/create-qr-code/?data=https://tqtravel.herokuapp.com/ordendeservicio?id=${r.id}` }
        res.render('links/orden', { orden, imag });

    } else {
        const ordenes = await pool.query(qery);
        ordenesdeservicio = { "data": ordenes };
        res.send(ordenesdeservicio);
    }

});
router.post('/orden', isLoggedIn, async (req, res) => {
    const { reserva, conductor, vehiculo } = req.body
    const orden = { reserva, conductor, vehiculo }
    await pool.query('INSERT INTO ordenesdeservicio SET ?', orden);
    res.send(true);
});
router.put('/orden', isLoggedIn, async (req, res) => {
    const { id, reserva, conductor, vehiculo } = req.body
    const orden = { reserva, conductor, vehiculo }
    await pool.query(`UPDATE ordenesdeservicio SET ? WHERE id = ?`, [orden, id]);
    res.send(true);
});
router.delete('/orden', isLoggedIn, async (req, res) => {
    const { id } = req.body
    await pool.query(`DELETE FROM ordenesdeservicio WHERE id = ?`, id);
    res.send(true);
});

router.get('/ventas', isLoggedIn, (req, res) => {
    res.render('links/ventas');
});
router.get('/social', isLoggedIn, (req, res) => {
    res.render('links/social');
});
router.get('/recarga', isLoggedIn, (req, res) => {
    res.render('links/recarga');
});
router.post('/add', isLoggedIn, async (req, res) => {
    const { id, title, cliente, pasajeros, start, docgrupo, grupo, adicionales, guia, ruta,
        partida, destino, observaciones, usuario, creador, valor, vuelo, idavuelta, pax, fecha } = req.body;
    const ingreso = {
        title, cliente, pasajeros, start, docgrupo, grupo, adicionales, guia, ruta,
        partida, destino, observaciones, usuario, creador, valor, vuelo, idavuelta, pax, fecha
    };
    console.log(ingreso)
    await pool.query('INSERT INTO reservas set ?', ingreso);
    res.send(true);
});
router.post('/edit', isLoggedIn, async (req, res) => {
    const {
        id,
        title,
        cliente,
        pasajeros,
        start,
        docgrupo,
        grupo,
        adicionales,
        guia,
        ruta,
        partida,
        destino,
        observaciones,
        usuario,
        creador,
        valor,
        vuelo,
        idavuelta,
        pax,
        fecha
    } = req.body;
    const ide = {
        title,
        cliente,
        pasajeros,
        start,
        docgrupo,
        grupo,
        adicionales,
        guia,
        ruta,
        partida,
        destino,
        observaciones,
        usuario,
        creador,
        valor,
        vuelo,
        idavuelta,
        pax,
        fecha
    };

    console.log(ide)

    if (ide.ruta === '') {
        res.send('Error al acualizar esta reserva no se encontro la Ruta, registre la ruta antes de esditar la reserva');
    } else if (ide.cliente === '') {
        res.send('Error al acualizar esta reserva el cliente no se encuentra registrado, registrelo antes de esditar la reserva');
    } else {
        await pool.query(`UPDATE reservas SET ? WHERE id = ?`, [ide, id]);
        res.send(true);
    }

    //delete req.body.id;
});

router.post('/delete', isLoggedIn, async (req, res) => {
    const { id } = req.body
    const r = await pool.query('DELETE FROM reservas WHERE id = ?', id);
    res.send(true);
});

router.post('/clientes', isLoggedIn, async (req, res) => {
    const c = await pool.query('INSERT INTO clientes set ?', req.body);
    const clientes = await pool.query(`SELECT * FROM clientes`);
    res.send([clientes, c.insertId]);
});
/*router.post('/add', async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Link Saved Successfully');
    res.redirect('/links');
});*/

router.post('/map', async (req, res) => {
    const { origen, destino, idOrigen, idDestino } = req.body;
    var url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=place_id:${idOrigen}&destinations=place_id:${idDestino}&key=AIzaSyB_2RlIZ6QABu0dzJyF3oaA9dmlVs1aLQc`
    const resp = await axios.get(url);

    var tarifa = 0,
        distanc = resp.data.rows[0].elements[0].distance.value;

    if (distanc <= 20000 && distanc > 10000) {
        tarifa = (distanc / 1000) * 8000
    } else if (distanc <= 10000) {
        tarifa = (distanc / 1000) * 6400
    } else {
        tarifa = (distanc / 1000) * 3000
    }
    const datos = {
        km: resp.data.rows[0].elements[0].distance.text,
        cost: tarifa,
        tmpo: resp.data.rows[0].elements[0].duration.text
    }
    const ruta = {
        origen,
        destino,
        idOrigen,
        idDestino,
        precio: tarifa,
        distancia: datos.km,
        tiempo: datos.tmpo
    }
    const r = await pool.query('INSERT INTO rutas set ?', ruta);
    datos.id = r.insertId
    res.send(datos)
});

router.post('/movil', async (req, res) => {
    const { movil } = req.body;
    const cliente = await pool.query('SELECT * FROM clientes WHERE movil = ?', movil);
    res.send(cliente);
});
router.post('/ventas', async (req, res) => {
    const { prod, product, nombre, user, movil } = req.body;
    const result = await rango(req.user.id);
    const usua = await usuario(req.user.id);
    const sald = await saldo(27, result, req.user.id);
    let cel = movil.replace(/-/g, ""),
        producto = product.split(" "),
        pin = producto[0] + ID(8)

    if (cel.length !== 10) {
        req.flash('error', 'Numero movil invalido');
        res.redirect('/links/ventas');
    } else if (sald === 'NO') {
        req.flash('error', 'Transacción no realizada, saldo insuficiente');
        res.redirect('/links/ventas');
    } else {
        if (prod == 'IUX') {
            const venta = {
                pin,
                vendedor: usua,
                cajero: req.user.fullname,
                idcajero: req.user.id,
                product: producto[1],
                rango: result
            }
            //console.log(venta)            
            await pool.query('INSERT INTO ventas SET ? ', venta);
            sms('57' + cel, 'Bienvenido a IUX, ingrese a https://iux.com.co/app y canjea este Pin ' + pin);
            req.flash('success', 'Pin generado exitosamente');
            res.redirect('/links/ventas');
        } else if (producto == '' || nombre == '' || movil == '') {
            req.flash('error', 'Existe un un error en la solicitud');
            res.redirect('/links/ventas');
        } else {
            const venta2 = {
                vendedor: req.user.id,
                cliente: user,
                product,
                rango: req.user.rango
            }
            //await pool.query('INSERT INTO transaccion SET ? ', newLink);
            console.log(venta);
            req.flash('error', 'Transacción no realizada');
            res.redirect('/links/ventas');
        }
    }
});
router.post('/patro', async (req, res) => {
    const { quien } = req.body;
    if (quien == "Patrocinador") {
        const fila = await pool.query('SELECT * FROM pines WHERE id = ?', req.user.pin);
        res.send(fila);
    }
});

router.post('/recarga', async (req, res) => {
    const { monto, metodo, id } = req.body;
    const newLink = {
        remitente: id,
        acreedor: req.user.id,
        monto,
        metodo,
        creador: req.user.id,
    };
    await pool.query('INSERT INTO transaccion SET ? ', newLink);
    req.flash('success', 'Solicitud exitosa');
    res.render('/links/recarga');
});

router.post('/id', async (req, res) => {
    const { pin } = req.body;
    const rows = await pool.query('SELECT * FROM pines WHERE id = ?', pin);
    if (rows.length > 0 && rows[0].acreedor === null) {
        registro.categoria = rows[0].categoria
        registro.pin = pin;
        res.send(rows);
    } else {
        res.send('Pin de registro invalido, comuniquese con su distribuidor!');
    }
});
router.post('/canjear', async (req, res) => {
    const { pin } = req.body;
    const rows = await pool.query(`SELECT v.pin, p.producto, p.precio, p.dias 
    FROM ventas v INNER JOIN products p ON v.product = p.id WHERE pin = ?`, pin);
    if (rows.length > 0) {
        res.send(rows);
    } else {
        res.send('Pin invalido!');
    }
});
router.post('/iux', async (req, res) => {
    console.log(req.body);
    /*const { pin } = req.body;
    const rows = await pool.query('SELECT * FROM pines WHERE id = ?', pin);
    console.log(rows);
    if (rows.length > 0) {
        //res.send("este pin es invalido"); AND 
        res.send({ rows });
    } else {
        res.send('Pin de registro invalido, comuniquese con su distribuidor!');
        req.flash('error', 'Id de registro incorrecto');
    }*/
});

router.post('/afiliado', async (req, res) => {
    const { movil, cargo } = req.body, pin = ID(4);
    const nuevoPin = {
        id: pin,
        categoria: cargo,
        usuario: req.user.id
    }
    /*console.log(pin);
    if (cajero !== undefined) {
        console.log(pin);
        nuevoPin.categoria = 2
    }*/
    await pool.query('INSERT INTO pines SET ? ', nuevoPin);
    sms('57' + movil, 'Bienvenido a Operadora de viajes TQ tu ID sera ' + pin);
    req.flash('success', 'Pin del afiliado exitoso');
    res.redirect('/tablero');
});

router.post('/cliente', async (req, res) => {
    let respuesta = "",
        dat;
    const { telephone, buyerFullName, buyerEmail, merchantId, amount, referenceCode, actualizar } = req.body;
    var nombre = buyerFullName.toUpperCase();
    const newLink = {
        nombre: nombre,
        movil: telephone,
        email: buyerEmail
    };
    let url = `https://iux.com.co/x/venta.php?name=${buyerFullName}&movil=${telephone}&email=${buyerEmail}&ref=cliente&actualiza=${actualizar}`;
    request({
        url,
        json: true
    }, async (error, res, body) => {
        if (error) {
            console.error(error);
            return;
        }
        //console.log(Array.isArray(body))
        if (body.length > 0) {
            dat = await body.map((re) => {
                if (re.id === telephone && re.email === buyerEmail) {
                    respuesta = `Todo bien`;
                } else if (re.email !== buyerEmail && re.id === telephone) {
                    respuesta += `Esta cuenta <mark>${buyerEmail}</mark> no coincide con movil <mark>${telephone}</mark>, la cuenta regitrada con este movil es <mark>${re.email}</mark>. `;
                } else if (re.id !== telephone && re.email === buyerEmail) {
                    respuesta += `Este movil <mark>${telephone}</mark> no coincide con la cuenta <mark>${re.email}</mark> el movil registrado con esta cuenta es <mark>${re.id}</mark>. `;
                } else {
                    respuesta = `Todo bien`;
                }
                return re;
            });
        } else {
            respuesta = `Todo bien`;
        }
    });
    var saludo = async function () {
        if (respuesta !== "") {
            clearInterval(time);
            if (respuesta === 'Todo bien') {
                const rows = await pool.query('SELECT * FROM clientes WHERE movil = ? OR email = ?', [telephone, buyerEmail]);
                if (rows.length > 0) {
                    await pool.query('UPDATE clientes SET ? WHERE movil = ? OR email = ?', [newLink, telephone, buyerEmail]);
                } else {
                    await pool.query('INSERT INTO clientes SET ? ', newLink);
                }
                var pin = referenceCode + ID(8),
                    //APIKey = '4Vj8eK4rloUd272L48hsrarnUA',
                    APIKey = 'pGO1M3MA7YziDyS3jps6NtQJAg',
                    key = APIKey + '~' + merchantId + '~' + pin + '~' + amount + '~COP',
                    hash = crypto.createHash('md5').update(key).digest("hex"),
                    cdo;
                cdo = [hash, pin, dat];
                res.send(cdo);
            } else {
                res.send(['smg', respuesta, dat]);
            }
        }
    };
    let time = setInterval(saludo, 500);
});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ? ', [req.user.id]);
    res.render('links/list', { links });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Link Removed Successfully');
    res.redirect('/links');
});

router.get('/edit/:id', async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    const { id } = req.params;
    console.log(links);
    res.render('/links/edit', { link: links[0] });
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, url } = req.body;
    const newLink = {
        title,
        description,
        url
    };
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link Updated Successfully');
    res.redirect('/links');
});

//"a0Ab1Bc2Cd3De4Ef5Fg6Gh7Hi8Ij9Jk0KLm1Mn2No3Op4Pq5Qr6Rs7St8Tu9Uv0Vw1Wx2Xy3Yz4Z"
function ID(lon) {
    let chars = "0A1B2C3D4E5F6G7H8I9J0KL1M2N3O4P5Q6R7S8T9U0V1W2X3Y4Z",
        code = "";
    for (x = 0; x < lon; x++) {
        let rand = Math.floor(Math.random() * chars.length);
        code += chars.substr(rand, 1);
    };
    return code;
};
async function usuario(id) {
    const usuario = await pool.query(`SELECT p.categoria, p.usuario FROM pines p WHERE p.acreedor = ? `, id);
    if (usuario.length > 0 && usuario[0].categoria == 2) {
        console.log(usuario[0].usuario)
        return usuario[0].usuario;
    } else {
        console.log(id)
        return id
    }
};
async function saldo(producto, rango, id) {
    const produ = await pool.query(`SELECT precio, utilidad, stock FROM products WHERE id = ?`, producto);
    const rang = await pool.query(`SELECT comision FROM rangos WHERE id = ?`, rango);
    const operacion = produ[0].precio - (produ[0].utilidad * rang[0].comision / 100);
    const saldo = await pool.query(`SELECT IF(saldoactual < ${operacion} OR saldoactual IS NULL,'NO','SI') Respuesta FROM users WHERE id = ? `, id);
    return saldo[0].Respuesta
};
async function rango(id) {
    let m = new Date(),
        month = m.getMonth() - 2,
        d, meses = 0,
        mes = 0,
        reportes = new Array(4);
    const reporte = await pool.query(`SELECT MONTH(v.fechadecompra) Mes, COUNT(*) CantMes, SUM(p.precio) venta, SUM(p.utilidad) utilidad, c.nombre usari
    FROM ventas v 
    INNER JOIN clientes c ON v.client = c.id 
    INNER JOIN users u ON v.vendedor = u.id
    INNER JOIN products p ON v.product = p.id
    INNER JOIN pines pi ON u.pin = pi.id
    WHERE pi.usuario = ?
        AND YEAR(v.fechadecompra) = YEAR(CURDATE()) 
        AND MONTH(v.fechadecompra) BETWEEN ${month} and 12
    GROUP BY MONTH(v.fechadecompra)
    ORDER BY 1`, id);
    const reporte2 = await pool.query(`SELECT MONTH(t.fecha) Mes, COUNT(*) CanTrans, SUM(t.monto) monto
    FROM transacciones t     
    WHERE t.acreedor = ?
        AND YEAR(t.fecha) = YEAR(CURDATE()) 
        AND MONTH(t.fecha) BETWEEN ${month} and 12
    GROUP BY MONTH(t.fecha)
    ORDER BY 1`, id);

    if (reporte.length > 0) {
        await reporte.filter((repor) => {
            return repor.Mes === m.getMonth() + 1;
            //return repor.Mes === 9;
        }).map((repor) => {
            if (repor.CantMes >= 1 && repor.CantMes <= 19) {
                d = `${repor.Mes} ${repor.CantMes} 5`
                return reportes[0] = 5;
            } else if (repor.CantMes >= 20 && repor.CantMes <= 49) {
                return reportes[0] = 4;
            } else if (repor.CantMes >= 50 && repor.CantMes <= 99) {
                return reportes[0] = 3;
            } else if (repor.CantMes >= 100 && repor.CantMes <= 499) {
                return reportes[0] = 2;
            } else if (repor.CantMes >= 500) {
                return reportes[0] = 1;
            }
        });
        if (!reportes[0]) {
            reportes[0] = 6;
        };
        await reporte.filter((re) => {
            return re.Mes !== m.getMonth() + 1;
        }).map((re) => {
            mes += re.CantMes;
        });
        if (mes >= 1 && mes <= 59) {
            reportes[1] = 5;
        } else if (mes >= 60 && mes <= 149) {
            reportes[1] = 4;
        } else if (mes >= 150 && mes <= 299) {
            reportes[1] = 3;
        } else if (mes >= 300 && mes <= 1499) {
            reportes[1] = 2;
        } else if (mes >= 1500) {
            reportes[1] = 1;
        } else {
            reportes[1] = 6;
        }

        await reporte2.filter((re) => {
            return re.Mes !== m.getMonth() + 1;
        }).map((re) => {
            meses += re.monto;
        });
        if (meses <= 999000) {
            reportes[2] = 5;
        } else if (meses >= 1000000 && meses <= 2999000) {
            reportes[2] = 4;
        } else if (meses >= 3000000 && meses <= 4999000) {
            reportes[2] = 3;
        } else if (meses >= 5000000 && meses <= 14999000) {
            reportes[2] = 2;
        } else if (meses >= 15000000) {
            reportes[2] = 1;
        } else {
            reportes[2] = 6;
        }
        await reporte2.filter((rep) => {
            return rep.Mes === m.getMonth() + 1;
        }).map((rep) => {
            if (rep.monto <= 599000) {
                return reportes[3] = 5;
            } else if (rep.monto >= 600000 && rep.monto <= 1499000) {
                return reportes[3] = 4;
            } else if (rep.monto >= 1500000 && rep.monto <= 2999000) {
                return reportes[3] = 3;
            } else if (rep.monto >= 3000000 && rep.monto <= 9999000) {
                return reportes[3] = 2;
            } else if (rep.monto >= 10000000) {
                return reportes[3] = 1;
            } else {
                return reportes[3] = 6;
            }
        });
        if (!reportes[3]) {
            reportes[3] = 6;
        };
        return Math.min(...reportes);
    } else {
        return 5;
    };
};

module.exports = router;
