const whatsappConexao = require("./conectaWhats.js");
const { MessageMedia } = require('whatsapp-web.js');


function enviaBoleto(nomeBoleto, telefone, nomeDevedor) {
    console.log('MIDIA')

    whatsappConexao.client.on('ready', () => {

        whatsappConexao.client.isRegisteredUser(`55${telefone}@c.us`).then(function (isRegistered) {

            if (isRegistered) {
                const midia = MessageMedia.fromFilePath(`C:/boletos/${nomeBoleto}`);
                console.log(nomeBoleto)

                whatsappConexao.client.sendMessage(`55${telefone}@c.us`, `Bom dia ${nomeDevedor}, o seu boleto chegou!!`);
                whatsappConexao.client.sendMessage(`55${telefone}@c.us`, midia);

                console.log(`55${telefone} está registrado`)

            }else{
                console.log(`55${telefone} não está registrado`)

            }
        })
    });
}

module.exports = { enviaBoleto };