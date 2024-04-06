const mongoose = require('mongoose')

const username = encodeURIComponent(process.env.GENESIS_DATABASE_USERNAME)
const password = encodeURIComponent(process.env.GENESIS_DATABASE_PASSWORD)
const databaseName = encodeURIComponent(process.env.GENESIS_DATABASE_NAME)

const connectionURL = `mongodb://${username}:${password}@${process.env.GENESIS_DATABASE_URL}:${process.env.GENESIS_DATABASE_PORT}/${databaseName}?authMechanism=SCRAM-SHA-1&authSource=admin`
console.log(connectionURL)

mongoose.connect(connectionURL).then(() => {
    console.log('Conexão com o banco realizada com sucesso!')
}).catch((e) => {
    console.log('Falha na conexão com o banco')
    console.log(e)
})


