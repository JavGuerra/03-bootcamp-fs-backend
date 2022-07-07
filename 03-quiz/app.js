const config = require('./config');
const express = require('express');
const { application } = require('express');
const app = express();
const router = express.Router();

app.use((req, res, next) => {
    console.log('Ruta: ' + req.url);
    next();
});

app.use('/quiz', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.use('/home', router);

router.get('/contacto', (req, res, next) => {
    console.log('Estamos en la página de contacto');
    next();
});

router.get('/info', (req, res) => {
    res.send('Página de info');
});

router.get('/error', (req, res, next) => {
    console.log('Página de error');
    next(new Error('¡Ups!'));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error 500: Algo salió mal.');
});

// TODO Se ejecuta siempre, incluso cuando introduciomos una URL que no existe.
app.use((req, res) => {
    res.send('Página de cierre.');
});

app.listen(config.PORT);
console.log(`Express iniciado en el puerto ${config.PORT}.`);