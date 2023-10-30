const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Metaphor Search App',
      version: '1.0.0',
      description: 'API documentation for the backend.',
    },
    servers: [
      {
        url: 'http://localhost:8080', 
      },
    ],
  },
  apis: ['index.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };