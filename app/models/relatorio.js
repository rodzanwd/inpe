const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const relShema = new Schema(
    {
        id: Number,
        atividade: String,
        descricao: String,
        dia: Date,
        horaInicio: String,
        horaFim: String,
        orientaEstagiario: String,
        nomeEstagiario: String
    }, 
    { collection: 'relatorios'}
);

var Relatorio = mongoose.model('Relatorio', relShema);

module.exports = { 
    Mongoose: mongoose, 
    Relatorio: relShema 
};