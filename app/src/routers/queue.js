const express = require('express')
const axios = require('axios');
const router = new express.Router()
const Projects = require('../models/Projects')
const fs = require('fs').promises; // Usamos fs.promises para ter acesso às funções assíncronas do módulo fs
const path = require('path');
const { roadmapping } = require('../services/process');
const { get } = require('http');

router.get('/queue', async (req, res) => {

    try {
        const fileManifestName = req.query.fileManifestName;
        console.log("Arquivo adicionado à fila => Manifest: " + fileManifestName)
        // Adiciona o arquivo na fila de processamento
        fileQueue.push(fileManifestName);
    }
    catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
    // Processa os arquivos na fila
    await processQueue();

    res.status(200).json({ message: 'Arquivo adicionado à fila.' });

});

// Define o número máximo de arquivos que serão processados simultaneamente
const MAX_CONCURRENT_MANIFESTS = 2;
const MAX_CONCURRENT_FILES = 1;

// Array para armazenar os arquivos na fila
const fileQueue = [];
// Variável para controlar o número de arquivos sendo processados
let processingCount = 0;

// Função para processar o arquivo .mf
async function processMFFile(filename) {
    // Leitura do arquivo .mf
    const mfPath = path.join('files/manifests/', filename);
    const content = await fs.readFile(mfPath, 'utf-8');
    const files = content.split('\n').filter(Boolean); // Filtra elementos vazios

    // Crie uma cópia dos arquivos para não modificar o array original
    const filesCopy = [...files];

    // Crie um array para armazenar as promessas ativas
    const activePromises = [];

    while (filesCopy.length > 0) {
        // Enquanto houver arquivos para processar e menos do que MAX_CONCURRENT_FILES promessas ativas
        while (filesCopy.length > 0 && activePromises.length < MAX_CONCURRENT_FILES) {
            // Inicie o processamento do próximo arquivo e adicione a promessa ao array activePromises
            const file = filesCopy.shift();
            const promise = processPDF(file);
            activePromises.push(promise);
    
            promise.then(() => {
                // Quando a promessa for resolvida, remova-a do array activePromises
                const index = activePromises.indexOf(promise);
                if (index > -1) {
                    activePromises.splice(index, 1);
                }
            });
        }
    
        // Aguarde a primeira promessa ser resolvida antes de continuar
        if (activePromises.length > 0) {
            await Promise.race(activePromises);
        }
    }

    // Aguarde todas as promessas restantes serem resolvidas
    await Promise.all(activePromises);
}

async function processPDF(file) {
    // Simula o processamento de um arquivo PDF
    console.log(`Processando arquivo ${file}...`);
    const document = await getDocument(file);
    await roadmapping(document);
}

// Função para processar os arquivos na fila
async function processQueue() {
    // Verifica se ainda há arquivos na fila e se o limite de processamento simultâneo não foi atingido
    while (fileQueue.length > 0 && processingCount < MAX_CONCURRENT_MANIFESTS) {
        const filename = fileQueue.shift(); // Remove o primeiro arquivo da fila
        processingCount++; // Incrementa o contador de arquivos sendo processados
        try {
            await processMFFile(filename); // Processa o arquivo .mf
            console.log(`Arquivo ${filename} processado.`);
        } catch (error) {
            console.error(`Erro ao processar o arquivo ${filename}: ${error}`);
        } finally {
            processingCount--; // Decrementa o contador de arquivos sendo processados
        }
    }
}

async function getDocument(_name) {
    let response = null;
    try {
        response = await axios.get('http://backend-service:4100/documents/documentName/' + _name)
        console.log("Gathered document: " + response.data._id)
        return response.data
    } catch (error) {
        console.log("Erro ao recuperar document: " + _name)
        console.log(error);
    }
    return response.data
}

module.exports = router