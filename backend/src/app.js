const express = require('express');
const cors = require('cors');
const Parse = require('parse/node'); 
require('dotenv').config();
const router = require('./router');

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

// Configuração do Parse Server
Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_JS_KEY);
Parse.serverURL = process.env.PARSE_SERVER_URL;

console.log("Parse Server configurado com sucesso!");

module.exports = app;
