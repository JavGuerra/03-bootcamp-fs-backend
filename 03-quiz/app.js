const config = require('./config');
const express = require('express');
const homeRouter = require('./routes/home');
const app = express();

app.use((req, res, next) => {
    console.log('Ruta: ' + req.url);
    next();
});

app.use('/quiz', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.use('/home', homeRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    res.status(status).send(`Error ${status}: ${err.message}.`);
});

app.use((req, res) => {
    res.send('Página de cierre.');
});

app.listen(config.PORT, () => {
    console.log(`Express iniciado en el puerto ${config.PORT}.`);
})