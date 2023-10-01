const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/', require('./routes'));

try {
    mongodb.initDb((err) => {
        if (err) {
            console.error('Error initializing database:', err);
            throw err; // Lanza el error para ser capturado por el catch
        } else {
            app.listen(port, () => {
                console.log("Database is listening and node Running on port ", port);
            });
        }
    });
} catch (error) {
    console.error('Error in server initialization:', error);
}

