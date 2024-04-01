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

  document.getElementById('registerBtn').addEventListener('click', () => {
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

  document.getElementById('registerBtn').addEventListener('click', () => {
    const name = document.getElementById('name-input').value;
    const image = document.getElementById('image');

    if (name && image) {
      createUser(name, image);
    } else {
      alert('Nome ou foto não encontrados.');
    }
  });
});

function startWebCam(video) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((err) => console.error('Erro ao acessar a webcam:', err));
}

function createUser(name, image) {
  const api = new ApiCalls();
  let detections = [];
  api.createUser(name).then(async (user) => {
    const detection = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
    detection[0].descriptor.forEach(element => {
      detections.push(element);
    });
    api.createVector(user.id, detections).then(() => {
      alert('Usuário cadastrado com sucesso.');
    });
  });
}