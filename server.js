// Carrega nossas variáveis de ambiente de dentro do arquivo .env.
require('dotenv').config();

// Importa o express.
const express = require('express');

// Importa o manipulador do MongoDB na nossa aplicação.
const mongoose = require('mongoose');

// Importa o módulo path para trabalhar com caminhos absolutos.
const path = require('path');

// Importa nosso express session e utilitaŕios para trabalharmos com sessões.
const session = require('express-session');

// Utilizamos o MongoStore para salvar os cookies no mongoDB.
const MongoStore = require('connect-mongo');

// Mensagens de feedback para os usuários, que são salvas em sessões.
const flashMessages = require('connect-flash');

// Importa o Helmet e o CSRF para garantir a segurança da nossa aplicação.
const helmet = require('helmet');
const csrf = require('csurf');

// Importa as rotas da aplicação
const routes = require('./routes');

// Importa os middlewares da aplicação
const {
    globalMiddleware,
    checkCsrfError,
    csrfMiddleware
} = require('./src/middlewares/middleware');

// Inicia o app do express.
const app = express();

// Realiza a conexão com o banco de dados e 
// emite um evento que indica que o servidor por ser iniciado.
mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => app.emit('connectionSuccess'))
    .catch(err => console.log(err));

// Seta o diretório das nossas views, e seta a engine que será utilizada para
// trabalhar com elas.
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Definir para o app vai utilizar o helmet.
app.use(helmet());

// Definir para o app o caminho dos nosso arquivos estáticos
app.use(express.static(path.resolve(__dirname, 'public')));

// Definir para o app encodar os dados do nosso formulário quando for enviado.
app.use(express.urlencoded({
    extended: true
}));

// Define a compreensão de arquivos JSON.
app.use(express.json());

// Define as opções do nosso cookie.
const sessionOptions = session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTION_STRING }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true }
});

// Define o uso do nosso cookie e da nossa sessão, e tambem define o uso
// das flash messages.
app.use(sessionOptions);
app.use(flashMessages());

// Define o uso do CSRF e dos middlewares, alem das nossas rotas.
app.use(csrf());
app.use(globalMiddleware);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

// Fica escutando o evento "connectionSuccess" e quando ele for emitido 
// o servidor é iniciado.
app.on('connectionSuccess', () => {
    app.listen(3000, () => {
        console.log('Servidor executando...');
        console.log('Acessar servidor: http://127.0.0.1:3000/');
        console.log('----------------------------------------');
    });
});
