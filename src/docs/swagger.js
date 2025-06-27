const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Simulador de DICT - API',
            version: '1.0.0',
            description: 'API para simular o diretório de identificadores (PIX)',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Servidor local',
            }
        ],
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
