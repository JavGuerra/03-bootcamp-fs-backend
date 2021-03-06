const express = require('express');
const router = express.Router();
const manufacters = require('../manufacters');

const mongoDB = require('../services/DB');
const db = mongoDB.getDB();
const collection = db.collection('manufacters');

let myObj;

router.get('/', (req, res) => {

    // Usar la ruta /deleteManufacters
    // collection.drop(function(err, delOK) {
    //     if (err) throw err;
    //     if (delOK) console.log("Colección borrada.");
    // });

    db.createCollection('manufacters', function(err, res){
        if (err) throw err;
        console.log('Colección añadida.');
    });

    collection.insertMany(manufacters, function(err, res){
        if (err) throw err;
        console.log('Documentos añadidos.');
    });

    myObj = {
        "name": "DACIA",
        "cif": "B12345678",
        "address": "C. del invento, 2 12345 Toledo"
    }
    collection.insertOne(myObj, function(err, res){
        if (err) throw err;
        console.log('Documento añadido.');
    });

    res.end('OK');
});

module.exports = router;