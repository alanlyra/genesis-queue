const express = require('express')
const proxy = require('express-http-proxy')

// Conexão do banco de dados
require('./db/mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

// Importando arquivo de rotas
const healthyRouter = require('./routers/healthy')
const queueRouter = require('./routers/queue')
//const informacoesCboRouter = require('./routers/informacoesCbo')

const app = express()

// Criando o parser de json (as requisições chegam e vão como objetos JSON)
const jsonParser = bodyParser.json({
    limit: "50mb"
})

// Habilitando CORS e Transformando objeto recebido em JSON
app.use(cors())
// app.use(express.raw({ type: 'application/pdf' }))
// app.use(jsonParser)

const port = process.env.PORT || 4000


// Aplicando rotas ao Express
app.use(healthyRouter)
app.use(queueRouter)
//app.use("/rais", raisRouter)
//app.use("/ibge",ibgeRouter)
//app.use("/relatorio", proxy(process.env.SENAC_RELATORIOS_URL))

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`)
})