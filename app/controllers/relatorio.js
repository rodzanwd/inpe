const mongoose = require('mongoose');
const moment = require('moment');

const db = require("../models/relatorio");
const relatorio = db.Mongoose.model('relatorios', db.Relatorio, 'relatorios');

function data() {
    let data = new Date();   
    let dia = data.getDate();
    if (dia < 10) { 
        dia = '0' + dia; 
    }
    let mes = data.getMonth();
    mes++;
    if (mes < 10) { 
        mes = '0' + mes; 
    }
    let ano = data.getFullYear();
    return data = dia + '/' + (mes) + '/' + ano; 
}

module.exports.getRelatorios = (req, res) => {    
    relatorio.find({}).lean().exec(
        function (e, data) {
            res.render('index', { data: data});
            console.log(data)
            res.end();
        }
    );
    console.log('entrou na rota get da api');
}

module.exports.getRelatorioById = (req, res) => {
    relatorio.find({ _id: req.params.id }).lean().exec(
        function (e, data) {
            console.log(data)
            res.end();
        }
    );
}

module.exports.insertRelatorios = (req, res) => {

    let newRelatorio = new relatorio({
        atividade: req.body.atividade,
        descricao: req.body.descricao,
        dia: data(),
        horaInicio: req.body.horaInicio,
        horaFim: req.body.horaFim,
        orientaEstagiario: req.body.orientaEstagiario,
        nomeEstagiario: req.body.nomeEstagiario
    });

    newRelatorio.save((err, data) => {
        if(err){
            console.log("Véi... deu ruim!!! Óia só: " + err.message);
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        (data => {
            console.log('Bem, inseriu a data', data);
        })
        console.log('eita, ta bonito');
        res.redirect('/relatorios');
    });

    
}

module.exports.listUpRelatorio = (req, res) => {
    relatorio.find({ _id: req.params.id }).lean().exec(
        function (e, data) {
            res.render('update', { data: data});
            res.end();
        }
    );
}

module.exports.updateRelatorios = (req, res) => {
    relatorio.findOneAndUpdate({ _id: req.params.id }, req.body, function (e, doc) {
        if (e) {
            console.log('hum... zoou né', e)
        }
        res.redirect('/relatorios');
    });
}


module.exports.deleteRelatorios = (req, res) => {
    relatorio.findOneAndRemove({ _id: req.params.id }).exec(
        function (e, docs) {
            if (e) {
                console.error('Não foi possível deletar o Relatório', e)
            } else {
                console.log('Relatório deletado com sucesso!', docs)
            }
            res.redirect('/relatorios');
        }
    );
}