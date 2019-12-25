require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const app = express();

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
    console.log('Aqui',req.body);
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    let file_print = req.files.file;
    file_print.mv(`./files/${file_print.name}`,err => {
        if (err) {
            console.log('Error',err);
            
            return res.status(500).send({ message: err });  
        } 
        return res.status(200).send({ message : 'File upload' })
    })
    // res.send('FILE PRINTING...');
    // next();
});

app.use(express.static('public')); // como no encuentra la ruta / retorna el index.html

app.listen(app.get('port'), () => {
    console.log(`App name: ${app.get('appName')}`);
    console.log(`Server on port ${app.get('port')}`);
});