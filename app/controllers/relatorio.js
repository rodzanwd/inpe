const mongoose = require('mongoose');
const moment = require('moment');

const now = function(){
    let moment = require('moment');
    let nowDate = moment(new Date());
    let date = nowDate.format("D MMM YYYY");

}

const dataAtual = Date.now()

const db = require("../models/relatorio");
const relatorio = db.Mongoose.model('relatorios', db.Relatorio, 'relatorios');

module.exports.getRelatorios = (req, res) => {    

    relatorio.find({}).lean().exec(
        function (e, data) {
            res.render('index', { data: data, moment: moment });
            res.end();
        }
    );
    console.log('entrou na rota get da api');
}

module.exports.getRelatorioById = (req, res) => {
    relatorio.find({ _id: req.params.id }).lean().exec(
        function (e, data) {
            res.json(data);
            res.end();
        }
    );
}

module.exports.insertRelatorios = (req, res) => {

    let newRelatorio = new relatorio({
        atividade: req.body.atividade,
        descricao: req.body.descricao,
        dia: req.body.data,
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
            console.log('Bem, inseriu a data');
            console.log(data.dia);
        })
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
    let newRelatorio = new relatorio({
        atividade: req.body.atividade,
        descricao: req.body.descricao,
        dia: req.body.dia,
        horaInicio: req.body.horaInicio,
        horaFim: req.body.horaFim,
        orientaEstagiario: req.body.orientaEstagiario,
        nomeEstagiario: req.body.nomeEstagiario
    });
    relatorio.findOneAndUpdate(
        { _id: req.params.id }, 
        req.body, 
        {upsert: true, new: true, runValidators: true}, 
        function (e, doc) {
            console.log(doc)
            if (e) {
                console.log('hum... zoou né', e)
            }
            res.redirect('/relatorios');
        }
    );
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