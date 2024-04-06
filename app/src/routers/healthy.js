// Rotas para verificar se a API está funcionando
const express = require('express')
const router = new express.Router()

// Retorna um string indicando que o servidor está funcionando
router.get('/', async (req, res) => {

    res.send(`[${process.env.PROJECT_ENVIRONMENT.toUpperCase()}] Servidor de fila de processamento de Documentos do GENESIS está no ar`)

})

module.exports = router