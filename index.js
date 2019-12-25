require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const app = express();
const printer = require('./printer');

// settings
app.set('appName', 'cprinter');
app.set('port', process.env.PORT || 3000);

// middleware
app.use(express.json());
app.use(morgan('dev'));

app.use(fileUpload());

app.all('/print', (req, res, next) => {
    console.log('Nueva impresión');
    next();
});

// routes
app.post('/print', (req, res) => {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    let file_printer = req.files.file;
    printer.cprint(file_printer.name);
});

app.use(express.static('public')); // como no encuentra la ruta / retorna el index.html

app.listen(app.get('port'), () => {
    console.log(`App name: ${app.get('appName')}`);
    console.log(`Server on port ${app.get('port')}`);
});