const { Client, LocalAuth } = require('whatsapp-web.js');

var conectadoCheck = false


var whatsQrcode

const client = new Client({
    authStrategy: new LocalAuth()
});

module.exports = {client, conectadoCheck, whatsQrcode}