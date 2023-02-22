// ================ // importando variaveis dos outros arquivos \\=========== 
const whats = require('./whatsClass')
const globais = require('./Globais')

// ================ // importando libs \\=========== 
const express = require('express')
var cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const morganBody = require('morgan-body')
const fs = require('fs')
const path = require('path')

// ================ // Configuração do CORS \\=========== 
app.use(cors())
app.options('*', cors());


app.use(express.urlencoded({ extended: false }))

// ================ // Criação do LOG \\=========== 
app.use(bodyParser.json())

const usuWhatsApp = new whats.WhatsApp()

usuWhatsApp.iniciarClient()

app.get('/teste', (req, res) => {
    console.log('Endpoint Teste')
    res.send('Resposta API teste')

})

// ================ // Endpoint para conectar o whatsapp \\=========== 
app.post("/conecta-whats", cors(), async (req, res) => {

    console.log("===============================")
    console.log("Endpoint conecta whats acessado!!")

    //Verificar se telefone esta conectado ao whats e conetar caso não esteja.
    const qrcorde = await usuWhatsApp.iniciaWhats()

    console.log(`Qrcode no endpoint: ${qrcorde}`)

    res.send(qrcorde)
})

globais.client.on('ready', async () => {
    const log = fs.createWriteStream(
        path.join(__dirname, "./logs", "express.log"), { flags: "a" })

    morganBody(app, {
        noColors: true,
        stream: log
    })

    // ================ // Endpoint para verificar se whats está conectado \\=========== 
    app.post("/check-whats", cors(), (req, res) => {
        console.log("===============================")
        console.log("Endpoint checa whats acessado!!")

        const conectado = usuWhatsApp.checaState()
        console.log('Client se encontra' + conectado)

        res.send(conectado)
    })

    // ================ // Endpoint para realizar envio do boleto \\=========== 
    app.post("/envia-whats", (req, res) => {
        console.log("===============================")
        console.log("Endpoint envia whats acessado!!")

        let telefone = req.body.telefone
        let nomeBoleto = req.body.nomeboleto
        let nomeDevedor = req.body.nomedevedor

        usuWhatsApp.setInfo(telefone, nomeBoleto, nomeDevedor);
        usuWhatsApp.enviaBoletoConectado()

        res.send("Boleto encaminhado para envio")
    })

});

app.listen(8000, function () {
    console.log('Running on port 8000!')
})

// rodar API(estar na pasta "trunk" para rodar o seguinte comando): npm run dev
// CPF teste: 00794978452