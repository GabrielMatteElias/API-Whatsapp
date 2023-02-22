const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

var conectado = false

const client = new Client({
    authStrategy: new LocalAuth()
});


function iniciaWhats() {

    client.on('qr', qr => {
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
        console.log('WhatsApp pronto!');
        
    });

    client.initialize();

    conectado = true
    console.log('dentro da iniciawhats: ' + conectado)

    return conectado
}

module.exports = { iniciaWhats, client, conectado };