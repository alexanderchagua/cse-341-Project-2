const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Employees Api',
        description: 'Employees Api'
    },
    host: 'localhost:3001',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);