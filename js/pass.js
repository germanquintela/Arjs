
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

    var correcto = true

    document.getElementById('error1').classList.add('hide')
    document.getElementById('error2').classList.add('hide')
    document.getElementById('error3').classList.add('hide')
    document.getElementById('error4').classList.add('hide')

    console.log(result.text)
    var resultText = result.text
    

    var aScene = resultText.indexOf('a-scene')
    var aAnimation = resultText.indexOf('a-animation')
    var aMarker = resultText.indexOf('marker')
    var aEntity = resultText.indexOf('entity')
    var aSceneCierre = resultText.indexOf('/a-scene')


    var texture = 'textura'
    var scale = '0.02 0.02 0.02'
    
    if(aAnimation < aScene || aAnimation > aSceneCierre) {
        document.getElementById('error2').classList.remove('hide')
    }

    if(aMarker < aScene || aMarker > aSceneCierre) {
        document.getElementById('error3').classList.remove('hide')
    }

    if(aEntity < aScene || aEntity > aSceneCierre) {
        document.getElementById('error4').classList.remove('hide')
    }


    if(aScene < 0 ||  aAnimation > 0 || aMarker < 0 || aEntity < 0){
        document.getElementById('error1').classList.remove('hide')
        document.getElementById('error2').classList.add('hide')
        document.getElementById('error3').classList.add('hide')
        document.getElementById('error4').classList.add('hide')
    }


    if(!correcto) {
        document.getElementById('box').style.right = 0
    } else {
        document.getElementById('box-correcto').style.right = 0
    
    
            if( resultText.indexOf('textura2') > 0 ) {
                texture = 'textura2'
            }

            if( resultText.indexOf('textura3') > 0 ) {
                texture = 'textura3'
            }

            if( resultText.indexOf('0.5 0.5 0.5') > 0 ) {
                scale = '0.5 0.5 0.5'
            }

            if( resultText.indexOf('1 1 1') > 0 ) {
                scale = '1 1 1'
            }

            saveData(texture, scale)
    }


    load()

}

function saveData(textura, scale) {
    localStorage.setItem('textura', textura)
    localStorage.setItem('scale', scale)
}