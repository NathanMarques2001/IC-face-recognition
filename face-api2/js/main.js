// main.js

document.addEventListener('DOMContentLoaded', () => {
  const inputImage1 = document.getElementById('inputImage1');
  const imageDisplay1 = document.getElementById('imageDisplay1');
  const inputImage2 = document.getElementById('inputImage2');
  const imageDisplay2 = document.getElementById('imageDisplay2');
  const compareBtn = document.getElementById('compareBtn');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  let image1;
  let image2;

  const loadAndDrawImage = (fileInput, imageDisplay) => {
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const image = new Image();
        image.src = e.target.result;

        imageDisplay.src = e.target.result;
        imageDisplay.style.display = 'block';

        if (imageDisplay === imageDisplay1) {
          image1 = image;
        } else {
          image2 = image;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
      };

      reader.readAsDataURL(file);
    }
  };

  inputImage1.addEventListener('change', () => loadAndDrawImage(inputImage1, imageDisplay1));
  inputImage2.addEventListener('change', () => loadAndDrawImage(inputImage2, imageDisplay2));

  compareBtn.addEventListener('click', async () => {
    if (image1 && image2) {
      // Certifique-se de que todos os modelos necessários sejam carregados
      await faceapi.nets.ssdMobilenetv1.loadFromUri('./models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('./models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('./models');

      // Detectar rostos e pontos de referência
      const detections1 = await faceapi.detectAllFaces(image1).withFaceLandmarks().withFaceDescriptors();
      const detections2 = await faceapi.detectAllFaces(image2).withFaceLandmarks().withFaceDescriptors();

      if (detections1.length > 0 && detections2.length > 0) {
        // Vamos usar a primeira detecção em cada imagem
        const detection1 = detections1[0];
        const detection2 = detections2[0];

        // Calcular a distância euclidiana entre as características faciais dos dois rostos
        const distance = faceapi.euclideanDistance(detection1.descriptor, detection2.descriptor);

        // Definir um limiar para decidir se são a mesma pessoa
        const threshold = 0.6; // Este é um valor de exemplo, ajuste conforme necessário

        // Exibir a distância euclidiana
        console.log('Distância Euclidiana:', distance);

        // Comparar com o limiar
        if (distance < threshold) {
          alert('As faces são da mesma pessoa.');
        } else {
          alert('As faces não são da mesma pessoa.');
        }
      } else {
        alert('Rosto não detectado em uma das imagens.');
      }
    } else {
      alert('Carregue duas imagens antes de comparar.');
    }
  });
});
