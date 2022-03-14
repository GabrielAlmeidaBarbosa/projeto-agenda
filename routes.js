const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const userController = require('./src/controllers/userController');

/* Rotas da página inicial */
route.get('/index', homeController.index);

/* Rotas de usuários (Cadastro, login...) */
route.get('/user/index', userController.index);
route.post('/user/create', userController.create);
route.post('/user/login', userController.login);
route.get('/user/logout', userController.logout);

module.exports = route;
