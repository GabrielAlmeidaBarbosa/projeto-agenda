// 1# Importar o módulo path do Node.Js
const path = require('path');


// 2# Exportando nosso webpack para ser utilizado por outros arquivos.
module.exports = {
    /* Ambiente de desenvolvimento, se for development cria o arquivo mais rápido,
    se for production cria o arquivo minificado */
    mode: 'production',
    /* Define o caminho do arquivo principal da aplicação */
    entry: './frontend/index.js',
    /* Define o caminho e o nome do arquivo de saída com o código convertido */
    output: {
        path: path.resolve(__dirname, 'public', 'assets', 'js'),
        filename: 'bundle.js'
    },
    /* Define os módulos do webpack, como as regras de comportamento dentro do programa. */
    module: {
        rules: [{
            exclude: /node_modules/, // Ignorar a pasta node_modules
            test: /\.js$/, // Testar se a extensão do arquivo é .js
            // Define o loader a ser usado e outras opções
            use: {
                loader: 'babel-loader', // Instalado junto ao babel
                options: {
                    presets: ['@babel/env']
                }
            }
        }, {
            test: /\.css$/, // Testar se a extensão do arquivo é .css
            // Define o loader a ser usado para esse tipo de arquivo
            use: ['style-loader', 'css-loader']
        }]
    },
    /* Mapeia os arquivos dentro do Dev Tools do navegador */
    devtool: 'source-map'
};
