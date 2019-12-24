// Contenedor del drag and drop
let dropArea = document.getElementById('drop-area');
let progressBar = document.getElementById('progress-bar');
let alterUpload = document.getElementById('alterUpload');
let filesDone = 0;
let filesToDo = 0;

/**
 * Inicializa la barra de progreso con el número total 
 * de archivos que se esta subiendo.
 * @param {number} numfiles Número de archivos subiendo
 */
function initializeProgress(numfiles) {
    progressBar.style.width = 0;
    filesDone = 0;
    filesToDo = numfiles;
}
/**
 * Carga el porcentaje de la barra de carga, en relación 
 * a número de archivos subidos.
 */
function progressDone() {
    progressBar.style.width = `${filesDone / filesToDo * 100}%`;
    filesDone++;
    progressBar.style.width = `${filesDone / filesToDo * 100}%`;
}

/**
 * Detiene la propagación del evento y anula la acción por defecto.
 * @param {EventListener} e Evento
 */
function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}
/**
 * Agrega la clase `highlight` a `dropArea`.
 * @param {EventListener} e Evento
 */
function highlight(e) {
    dropArea.classList.add('highlight')
    initializeProgress(1); // esta línea es para que la barra tenga tiempo de regresar a 0 antes de subir nuevos archivos.
}
/**
* Quita la clase `highlight` a `dropArea`.
* @param {EventListener} e Evento
*/
function unhighlight(e) {
    dropArea.classList.remove('highlight')
}
/**
 * Captura los archivos del drag and drop y 
 * los envia a la API.
 * @param {DragEvent} e Evento 
 */
function handleDrop(e) {
    let dt = e.dataTransfer
    let files = dt.files

    handleFiles(files);
}
/**
 * Convierte la lista tipo `FileList` a un array.
 * @param {FileList} files Archivos
 */
function handleFiles(files) {
    files = [...files];
    initializeProgress(files.length); // <- Add this line
    files.forEach(uploadFile);
}
/**
 * Envia un archivo a la API.
 * @param {File} file Archivo
 */
async function uploadFile(file) {
    let url = '/print'
    let formData = new FormData()

    formData.append('file', file)

    try {
        /* Done. Inform the user */
        let res = await fetch(url, {
            method: 'POST',
            body: formData
        });
        console.log(res);
        if (res.status === 200) {
            console.log(`Imprimiendo: ${file.name}`);
            progressDone();
            wazedevtoastr["success"](file.name, "Imprimiendo...", {
                "positionClass": "toast-bottom-right",
            });
        } else {
            wazedevtoastr["error"](res.statusText, "Error:", {
                "positionClass": "toast-bottom-right",
            });
        }
    } catch (error) {
        /* Error. Inform the user */
        console.log(`Error: ${error}`);
        wazedevtoastr["error"](file.name, "Error al imprimir:", {
            "positionClass": "toast-bottom-right",
        });
    }
}

// estableciendo preventDefaults a todos los eventos de drag and drop
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});
// agregando clase `highlight` al contenedor.
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});
// quitando clase `highlight` al contenedor
['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});
// evento drop para subir archivos
dropArea.addEventListener('drop', handleDrop, false);
// click-drop para smartphones, también se puede hacer con touchstart, pero da una advertencia y toca hacer tap dos veces
dropArea.addEventListener('click', e => {
    alterUpload.click();
});
