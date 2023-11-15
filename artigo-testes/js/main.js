document.addEventListener('DOMContentLoaded', async () => {
  const imageDisplay1 = document.getElementById('imageDisplay1');
  const imageDisplay2 = document.getElementById('imageDisplay2');
  const compareBtn = document.getElementById('compareBtn');
  const resultTable = document.getElementById('resultTable');
  const thresholds = [0.4, 0.5, 0.6, 0.425, 0.45, 0.475, 0.525, 0.55, 0.575, 0.5125, 0.525, 0.5375, 0.55, 0.55625, 0.5625];
  // Case 1: 0.4, 0.5, 0.6
  // Case 2: 0.425, 0.45, 0.475, 0.525, 0.55, 0.575
  // Case 3: 0.5125, 0.525, 0.5375, 0.55, 0.55625, 0.5625

  let distance = 0;
  let tp = 0;
  let fp = 0;
  let tn = 0;
  let fn = 0;
  let rowCount = 1;

  const loadImage = async (imagePath) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
      img.src = imagePath;
    });
  };

  const loadImagesFromJson = async (jsonPath) => {
    try {
      const response = await fetch(jsonPath);
      const jsonData = await response.json();
      await loadFaceRecognitionModels();

      for (let i = 0; i < thresholds.length; i++) {
        tp = 0;
        fp = 0;
        tn = 0;
        fn = 0;

        for (let j = 0; j < jsonData.length; j += 2) {
          const imagePath1 = jsonData[j];
          const imagePath2 = jsonData[j + 1];

          const img1 = await loadImage(imagePath1);
          const img2 = await loadImage(imagePath2);

          displayImages(img1, img2);

          console.log(rowCount++);

          try {
            const response = await compareImages(img1, img2, thresholds[i]);
            tp += truePositive(extractName(imagePath1), extractName(imagePath2), response);
            fp += falsePositive(extractName(imagePath1), extractName(imagePath2), response);
            tn += trueNegative(extractName(imagePath1), extractName(imagePath2), response);
            fn += falseNegative(extractName(imagePath1), extractName(imagePath2), response);

          } catch (error) {
            console.error('Erro ao comparar imagens:', error);
          }
        }

        addRowToTable({
          threshold: thresholds[i],
          tp: tp,
          fp: fp,
          tn: tn,
          fn: fn,
          precision: tp / (tp + fp),
          recall: tp / (tp + fn),
          tpr: tp / (tp + fn),
          fpr: fp / (fp + tn)
        });

      }
      alert('Todas as comparações foram concluídas.');
    } catch (error) {
      console.error('Erro ao carregar JSON:', error);
    }
  };

  const displayImages = (img1, img2) => {
    imageDisplay1.src = img1.src;
    imageDisplay2.src = img2.src;
  };

  const compareImages = async (image1, image2, threshold) => {

    const detections1 = await faceapi.detectAllFaces(image1).withFaceLandmarks().withFaceDescriptors();
    const detections2 = await faceapi.detectAllFaces(image2).withFaceLandmarks().withFaceDescriptors();

    if (detections1.length > 0 && detections2.length > 0) {
      const detection1 = detections1[0];
      const detection2 = detections2[0];

      distance = await faceapi.euclideanDistance(detection1.descriptor, detection2.descriptor);

      return distance < threshold;
    }

    return false;
  };

  const loadFaceRecognitionModels = async () => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('./models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('./models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('./models');
  };

  const addRowToTable = (rowData) => {
    const newRow = resultTable.insertRow();
    newRow.insertCell(0).textContent = rowData.threshold;
    newRow.insertCell(1).textContent = rowData.tp;
    newRow.insertCell(2).textContent = rowData.fp;
    newRow.insertCell(3).textContent = rowData.tn;
    newRow.insertCell(4).textContent = rowData.fn;
    newRow.insertCell(5).textContent = rowData.precision;
    newRow.insertCell(6).textContent = rowData.recall;
    newRow.insertCell(7).textContent = rowData.tpr;
    newRow.insertCell(8).textContent = rowData.fpr;
  };

  const tableToCSV = () => {
    const csv_data = [];
    const rows = document.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
      const cols = rows[i].querySelectorAll('td,th');
      const csvrow = [];
      for (let j = 0; j < cols.length; j++) {
        csvrow.push(cols[j].textContent);
      }
      csv_data.push(csvrow.join(","));
    }
    downloadCSVFile(csv_data);
  };


  const downloadCSVFile = (csv_data) => {
    const CSVFile = new Blob([csv_data], { type: "text/csv" });
    const temp_link = document.createElement('a');
    temp_link.download = "GfG.csv";
    const url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;

    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    temp_link.click();
    document.body.removeChild(temp_link);
  };

  const baixarCsv = document.getElementById('downloadCSV');
  baixarCsv.addEventListener('click', () => {
    tableToCSV();
  });

  const extractName = (name) => {
    return name.substring(7, name.indexOf('_0'));
  };

  const comparesNames = (name1, name2) => {
    return name1 === name2;
  };

  compareBtn.addEventListener('click', () => {
    loadImagesFromJson('./utils/caminhosFotos.json');
  });

  const truePositive = (name1, name2, result) => {
    if (name1 === name2 && result) {
      return 1;
    }
    return 0;
  }

  const falsePositive = (name1, name2, result) => {
    if (name1 !== name2 && result) {
      return 1;
    }
    return 0;
  }

  const trueNegative = (name1, name2, result) => {
    if (name1 !== name2 && !result) {
      return 1;
    }
    return 0;
  }

  const falseNegative = (name1, name2, result) => {
    if (name1 === name2 && !result) {
      return 1;
    }
    return 0;
  }
});
