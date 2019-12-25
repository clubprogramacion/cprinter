require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const app = express();
const printer = require('./printer');
const fs = require('fs');

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
    let path = `./docs_to_print/${file_printer.name}`;
    // File Save
    file_printer.mv(path, err => {
        if (err) {
            console.log('Error', err);
            return res.status(500).send({ message: err });
        }
    })
    // File printer
    if (printer.cprint(path) == true) {
        // File delete
        fs.unlink(path, (err) => {
            if (err) {
                return res.status(400).send('No files delete.');
            }
        })
    } else {
        return res.status(400).send('No files printer.');
    }
    return res.status(200).send({ message: 'File Printer' });
});

app.use(express.static('public')); // como no encuentra la ruta / retorna el index.html

app.listen(app.get('port'), () => {
    console.log(`App name: ${app.get('appName')}`);
    console.log(`Server on port ${app.get('port')}`);
});