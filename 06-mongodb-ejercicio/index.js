const express = require('express');
const app = express();
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    const cors = require('cors');
    app.use(cors());
}
const port = process.env.PORT;
const mongoDB = require('./services/DB');

app.use((req, res, next) => {
    console.log('Ruta: ' + req.url);
    next();
});

mongoDB.connectDB((err, client) => {
    if (err) throw err;

    //  http:localhost:3000/createmanufacturers
    const DBRouterCreateManufacturers = require('./routes/createManufacturers');
    app.use('/createmanufacturers', DBRouterCreateManufacturers);

    //  http:localhost:3000/createproducts
    const DBRouterCreateProducts = require('./routes/createProducts');
    app.use('/createproducts', DBRouterCreateProducts);

    //  http:localhost:3000/deletemanufacturers
    const DBRouterDeleteManufacturers = require('./routes/deleteManufacturers');
    app.use('/deletemanufacturers', DBRouterDeleteManufacturers);

    //  http:localhost:3000/deleteproducts
    const DBRouterDeleteProducts = require('./routes/deleteProducts');
    app.use('/deleteproducts', DBRouterDeleteProducts);

    //  http:localhost:3000/findproducts
    const DBRouterFindProducts = require('./routes/findProducts');
    app.use('/findproducts', DBRouterFindProducts);

    //  http:localhost:3000/updateproducts
    const DBRouterUpdateProducts = require('./routes/updateProducts');
    app.use('/updateproducts', DBRouterUpdateProducts);

    //  http:localhost:3000/exit
    app.get('/exit', (req, res) => {
        client.close();
        res.end('Fin');
        process.kill(process.pid, 'SIGTERM');
    });

    app.use((req, res) => {
        res.status(404).send('Error 404: No encontrado.');
    });

    app.use((err, req, res, next) => {
        console.error(err.stack);
        const status = err.status || 500;
        res.status(status).send(`Error ${status}: ${err.message}.`);
    });

    const server = app.listen(port, () => {
        console.log(`Servidor levantado en el puerto ${port}.`);
    });

    process.on('SIGTERM', () => {
        server.close(() => console.log('Proceso terminado.'))
    });
});