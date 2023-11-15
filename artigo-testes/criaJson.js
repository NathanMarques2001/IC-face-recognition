const fs = require('fs');
const path = require('path');

const pastaComFotos = './images/'; // Substitua pelo caminho real da sua pasta
const arquivoJson = './utils/caminhosFotos.json';

fs.readdir(pastaComFotos, (err, arquivos) => {
    if (err) {
        console.error('Erro ao listar arquivos:', err);
        return;
    }

    // Array para armazenar os caminhos
    const caminhos = [];

    // Preencher o array com os caminhos dos arquivos
    arquivos.forEach(arquivo => {
        const caminhoCompleto = path.join(pastaComFotos, arquivo);
        caminhos.push(caminhoCompleto);
    });

    // Escrever o array em um arquivo JSON
    const dadosJson = JSON.stringify(caminhos, null, 2);

    fs.writeFile(arquivoJson, dadosJson, 'utf8', err => {
        if (err) {
            console.error('Erro ao escrever arquivo JSON:', err);
        } else {
            console.log(`Caminhos escritos em ${arquivoJson}`);
        }
    });
});