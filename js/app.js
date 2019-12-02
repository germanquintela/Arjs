
var exampleImage = ''

function imgSave() {
    load('cargando')
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();

    reader.onloadend = function () {
        exampleImage = reader.result
        detect()
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
    }

}

function detect() {
    const worker = new Tesseract.TesseractWorker();
        worker.recognize(exampleImage)
            .then(result => resultado(result))
            .finally(() => worker.terminate());
            
        const detectWorker = new Tesseract.TesseractWorker();
        detectWorker.detect(exampleImage)
            .then(result => resultado(result))
            .finally(() => detectWorker.terminate());
            
}

function load(data) {
    if(data === 'cargando') {
        document.getElementById('loader').classList.remove('hide')
        document.getElementById('botonCarga').classList.add('hide')
    } else {
        document.getElementById('loader').classList.add('hide')
        document.getElementById('botonCarga').classList.remove('hide')
    }
    
}

function resultado(result) {
    console.log('result', result.text)
    load()
    document.getElementById('box').style.right = 0
}