require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();

// settings
app.set('appName', 'cprinter');
app.set('port', process.env.PORT || 3000);

// middleware
app.use(express.json());
app.use(morgan('dev'));

app.all('/print', (req, res, next) => {
    console.log('Nueva impresión');
    next();
});

// routes
app.post('/print', (req, res) => {
    console.log(req.body);
    res.send('FILE PRINTING...');
});

app.use(express.static('public')); // como no encuentra la ruta / retorna el index.html

app.listen(app.get('port'), () => {
    console.log(`App name: ${app.get('appName')}`);
    console.log(`Server on port ${app.get('port')}`);
});