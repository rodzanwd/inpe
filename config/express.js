const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const multiparty = require('connect-multiparty');
const path = require('path');

module.exports = () => {
    let app = express();

    app.set('views', 'app/views');
    app.set('view engine', 'ejs');

    //app.use(express.static(path.join(__dirname, "public")));
    app.use(express.static('./app/public'));

    app.use(bodyParser.urlencoded({ extended:true}));
    app.use(bodyParser.json());
    app.use(multiparty());

    app.use(function(req, res, next){

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader("Access-Control-Allow-Credentials", true);

        next();
    });

    let appDir = 'app';
    let confDir = 'config';

    consign()
        .include(`${confDir}/db.js`)
        .then(`${appDir}/models`)
        .then(`${appDir}/controllers`)
        .then(`${appDir}/routers`)
        .into(app)
    ;

    return app;
}