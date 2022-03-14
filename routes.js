const express = require('express');
const route = express.Router();

const { loginRequired } = require('./src/middlewares/middleware');

const homeController = require('./src/controllers/homeController');
const userController = require('./src/controllers/userController');
const contactController = require('./src/controllers/contactController');

/* Rotas da página inicial */
route.get('/index', homeController.index);

/* Rotas de usuários (Cadastro, login...) */
route.get('/user/index', userController.index);
route.post('/user/create', userController.create);
route.post('/user/login', userController.login);
route.get('/user/logout', userController.logout);

/* Rotas de Contatos (CRUD) */
route.get('/contacts/index', loginRequired, contactController.index);
route.post('/contacts/register', loginRequired, contactController.register);
route.get('/contacts/index/:id', loginRequired, contactController.update);

module.exports = route;
