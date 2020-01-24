const printer = require('pdf-to-printer');

/**
 * Imprime un archivo en la impresora predeterminada.
 * @param {string} documentToPrint Ubicación del archivo a imprimir
 */
async function cprint(documentToPrint) {
    try {
        await printer.print(documentToPrint); // cuando todo va bien retorna nada
        return true;
    } catch (error) {
        throw (error);
    }
}

/**
 * Valida que la extension sea entre las aceptadas.
 * @param {string} ext Extension
 */
function validateExt(ext) {
    switch (ext.toLowerCase()) {
        case '.png':
            return true;
        case '.jpg':
            return true;
        case '.pdf':
            return true;
        default:
            return false;
    }
}

exports.cprint = cprint;
exports.validateExt = validateExt;
