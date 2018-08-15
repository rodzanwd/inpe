const express = require('express');

const controller = require('../controllers/relatorio');

module.exports = (app) => {
    //Get All
    app.get('/relatorios', controller.getRelatorios);
    //Get by ID
    app.get('/relatorio/:id', controller.getRelatorioById);
    //Insert
    app.post('/newRelatorio', controller.insertRelatorios);
    //Update
    app.get('/upRelatorio/:id', controller.listUpRelatorio);
    //Save updated relatorio
    app.post('/updateRelatorio', controller.updateRelatorios);
    //Delete
    app.get('/rmRelatorio/:id', controller.deleteRelatorios);
}

