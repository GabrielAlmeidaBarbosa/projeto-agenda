const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

/* Rotas da página inicial */
route.get('/index', homeController.index);

/* Rotas de login */
route.get('/login/index', loginController.index);

module.exports = route;
