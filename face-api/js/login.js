import ApiCalls from './api-calls.js';

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('../models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('../models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('../models'),
]);

document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('video');
  let image;

  startWebCam(video);

  document.getElementById('loginBtn').addEventListener('click', () => {
    const imageContainer = document.getElementById('div');
    const canvas = document.createElement('canvas');
    canvas.width = video.width;
    canvas.height = video.height;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (image) {
      image.src = canvas.toDataURL('image/png');
      image.id = 'image';
    } else {
      image = new Image();
      image.src = canvas.toDataURL('image/png');
      image.style.display = 'none';
      image.id = 'image';
      imageContainer.appendChild(image);
    }
  });

  document.getElementById('loginBtn').addEventListener('click', compareImages);

});

function startWebCam(video) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((err) => console.error('Erro ao acessar a webcam:', err));
}

async function compareImages() {
  console.log('Iniciando detecção facial...');
  const image = document.getElementById('image');

  if (image) {
    console.log('Modelos carregados. Iniciando detecção...');

    const detection = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();

    if (detection.length > 0) {
      const api = new ApiCalls();
      let detections = [];

      detection[0].descriptor.forEach(element => {
        detections.push(element);
      });

      api.euclideanDistance(detections).then((euclideanDistance) => {
        const result = euclideanDistance.calcular_distancia_euclidiana;
        const id = result.substring(1, result.indexOf(','));
        const distance = result.substring(result.indexOf(',') + 1, result.indexOf(')'));
        findUser(id, distance);
      });
    } else {
      console.log('Nenhum rosto detectado.');
    }
  } else {
    console.log('Imagem não encontrada.');
  }
}

function findUser(id, euclideanDistance) {
  if (euclideanDistance < 0.5) {
    const api = new ApiCalls();
    api.getUser(id).then((user) => {
      window.location.href = `../pages/isLogged.html?username=${user.name}&id=${user.id}&euclideanDistance=${euclideanDistance}`;
    });
  } else {
    console.log('Usuário não encontrado.');
  }
}