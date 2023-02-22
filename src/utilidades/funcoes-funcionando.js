const whatsappConexao = require("./conectaWhats.js");

// Verificar se o número é registrado
function verifica(telefone){

    whatsappConexao.client.on('ready', async () => {

        let contato = await whatsappConexao.client.isRegisteredUser(`5551${telefone}@c.us`) //Ricardo
        console.log(`${telefone} é: ` + contato)

        let contato2 = await whatsappConexao.client.isRegisteredUser(`5551585146811@c.us`) //inexistente 
        console.log("51585146811 é: " + contato2)

        let contato3 = await whatsappConexao.client.isRegisteredUser(`555180505781@c.us`) //daniel
        console.log("5180505781 é: " + contato3)
    });
}

// Pega o link da foto do contato
function pegaFoto(){
    whatsappConexao.client.on('ready', async () => {
        let state = await whatsappConexao.client.getProfilePicUrl(`555185146811@c.us`)
        console.log('Pegar Foto')
        console.log(state)
    });
}

// Mostra a versão do whatsapp
function pegaVersao(){
    whatsappConexao.client.on('ready', async () => {
        let state = await whatsappConexao.client.getWWebVersion(`555185146811@c.us`)
        console.log('Versão do Whatsapp')
        console.log(state)
    });
}

function pegaChats(){
    whatsappConexao.client.on('ready', async () => {
        let chat = await whatsappConexao.client.getChats(`5551585146811@c.us`)
        console.log(chat)
    });
}

module.exports = {  };