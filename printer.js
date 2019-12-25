const printer = require('pdf-to-printer');

async function cprint(documentToPrint) {
    try {
        let resp = await printer.print(documentToPrint);
        console.log(resp);
    } catch (error) {
        console.error('Error',error);
    }
}

// let documentToPrint = 'cpriner.pdf';
// cprint(documentToPrint);
module.exports = {
    "cprint": cprint
}