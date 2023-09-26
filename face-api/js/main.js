const webcam = document.querySelector('#webcam')

//Após todas as promises resolvidas starta o vídeo
Promise.all([

  faceapi.nets.tinyFaceDetector.loadFromUri('./models'), // Detecção
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'), // Pontos de referência do rosto
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'), // Localiza pessoas no vídeo
  faceapi.nets.faceExpressionNet.loadFromUri('./models') // Expressões faciais

]).then(StartWebCam)

async function StartWebCam() {
  const constraints = { video: true };

  try {
    let stream = await navigator.mediaDevices.getUserMedia(constraints);

    webcam.srcObject = stream;
    webcam.onloadedmetadata = e => {
      webcam.play();
    }

  } catch (err) {
    console.error(err);
  }
}

webcam.addEventListener('play', () => {

  const canvas = faceapi.createCanvasFromMedia(webcam) // Criando canvas para mostrar nossos resultador
  document.body.append(canvas) // Adicionando canvas ao body

  const displaySize = { width: webcam.width, height: webcam.height } // criando tamanho do display a partir das dimenssões da nossa webcam

  faceapi.matchDimensions(canvas, displaySize) // Faz as dimensões do canvas serem iguais a da webcam

  //setInterval faz as detecções serem de 0.1s a 0.1s
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(
      webcam,
      new faceapi.TinyFaceDetectorOptions() // Biblioteca que vamos usar para detecção

    )
      .withFaceLandmarks() // Vai desenhar os pontos de marcação no rosto


    const resizedDetections = faceapi.resizeResults(detections, displaySize) // Redimensionado as detecções


    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height) // Apagando nosso canvas antes de desenhar outro

    faceapi.draw.drawDetections(canvas, resizedDetections) // Desenhando decções
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections) // Desenhando os pontos de referencia

  }, 100);
})