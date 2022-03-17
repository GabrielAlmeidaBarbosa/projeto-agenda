import 'core-js/stable';
import 'regenerator-runtime/runtime';

import ValidateLogin from './assets/js/modules/ValidateLogin';

// Importa o arquivo CSS que contem o estilo da pagina html.
// import './assets/css/style.css';

const register = new ValidateLogin('.form-register');
register.init();
const login = new ValidateLogin('.form-login');
login.init();
