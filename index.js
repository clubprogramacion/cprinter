require('dotenv').config();
const chalk = require('chalk');
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const app = express();
const { cprint, validateExt } = require('./printer');
const fs = require('fs');
const path = require('path');
// to print on terminal
const logBlue = (...str) => console.log(chalk.blue.bold(...str));
const logMagenta = (...str) => console.log(chalk.magenta.bold(...str));
const logRed = (...str) => console.log(chalk.red.bold(...str));
const logYellow = (...str) => console.log(chalk.yellow.bold(...str));

// settings
app.set('appName', 'cprinter');
app.set('port', process.env.PORT || 3000);
let docs = process.env.DOCS_TO_PRINT || 'docs_to_print';

// middleware
app.use(express.json());
app.use(morgan('dev'));

app.use(fileUpload({
    // debug: true
}));

app.all('/print', (req, res, next) => {
    console.log('Nueva impresión');
    next();
});

// routes
app.post('/print', async (req, res) => {
    if (!req.files) return res.status(400).send('No files were uploaded.');
    // crea la carpeta en caso de no existir
    let docsToPrint = path.join(__dirname, docs);   // ubicacion actual + carpeta temporal
    if (!fs.existsSync(docsToPrint)) {              // comprueba que existe la ubicacion
        fs.mkdirSync(docsToPrint, 0744);            // si no existe la crea
    }
    let filePrinter = req.files.file;
    let dir = path.join(docsToPrint, filePrinter.name);
    let ext = path.extname(dir);
    if (!validateExt(ext)) {                        // valida el tipo de archivo
        logRed('Error: Archivo no soportado -', ext);
        res.statusMessage = 'Archivo no soportado';
        return res.status(501).end();
    }
    // File Save
    await filePrinter.mv(dir, err => {
        if (err) {
            res.statusMessage = 'No se puede subir el archivo.';
            return res.status(500).end();
        }
    });
    try {
        await cprint(dir); // imprime
        fs.unlinkSync(dir); // borra el archivo
    } catch (error) {
        fs.unlinkSync(dir); // borra el archivo
        if (typeof error === 'string') {
            logRed(error);
            res.statusMessage = error;
            return res.status(400).end();
        }
        if (error.code === 'EBUSY') {
            logRed('Error: El archivo esta siendo utilizado.');
            res.statusMessage = 'El archivo esta siendo utilizado.';
            return res.status(400).end();
        }
    }
    return res.status(200).send({ message: 'File Printer' });
});

app.use(express.static('public')); // como no encuentra la ruta / retorna el index.html

app.listen(app.get('port'), () => {
    console.log(`App name: ${app.get('appName')}`);
    console.log(`Server on port ${app.get('port')}`);
});