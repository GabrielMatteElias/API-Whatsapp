const { MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const globais = require("./Globais");
const { text } = require('body-parser');

// ================ // Classe para acessar funções do Whatsapp  \\ ================ \\
class WhatsApp {
    async iniciarClient() {
        await globais.client.initialize()
    }

    async setInfo(telefone, nomeboleto, nomedevedor) {
        this.telefone = telefone,
            this.nomeBoleto = nomeboleto,
            this.nomeDevedor = nomedevedor
    }

    async verificaCheck(res) {
        if (res === "CONNECTED")
            return 'Conectado'
        else
            return 'Desconectado'
    }

    // ================ // Checa se o client se econtra conectado com algum whatsapp \\ ================ \\ 
    checaState() {

        console.log('Acessou checaState')

        globais.client.getState().then(async (result) => {
            if (!result.match("CONNECTED"))
                globais.conectadoCheck = await this.verificaCheck(result)
            else
                console.log("Whatsapp Client State =", result)

            globais.conectadoCheck = await this.verificaCheck(result)

        });

        return globais.conectadoCheck

    }

    // ================ // Cria conexão com whatsapp e gera QRcode caso não haja sessão ainda \\ ================ \\ 
    iniciaWhats() {

        console.log('Acessou iniciaWhats')

        return new Promise((resolve) => {
            globais.client.on('qr', (qr) => {
                globais.whatsQrcode = qr
                qrcode.generate(qr, { small: true });
                console.log('Client ready')
                resolve(qr)
            });
        })
    }

    // ================ // Realiza o envio do boleto \\ ================ \\ 
    async enviaBoletoConectado() {

        console.log('Acessou iniciaWhats')

        globais.client.getNumberId(this.telefone).then(async (result) => {
            console.log('%%%%%%%%%%%%%%%%%%%%%%%')
            console.log(result)
			console.log('Telefone recebido1: ' + this.telefone)
            console.log('  ')
            console.log('  ')


			if (result === null) { 
                let ddd = this.telefone.slice(0,2)
                console.log('DDD: ' + ddd)

                let num = this.telefone.slice(2)
                console.log('Num: ' + num)

                let novoTelefone = `${ddd}9${num}`
                this.telefone = novoTelefone

                console.log("Telefone ajustado: " + this.telefone)
                await globais.client.getNumberId(this.telefone).then(async (result) => {
                    console.log('%%%%%%%%%%%%%%%%%%%%%%%')
                    console.log(result)
                    console.log('Telefone recebido2: ' + this.telefone)
                    this.telefone = result.user
                })
            }else{
                this.telefone = result.user
                console.log('Telefone recebido3: ' + this.telefone)
            }

            try {

                console.log("Iniciando envio")
                console.log(this.telefone)
                console.log(this.nomeBoleto)
                console.log(this.nomeDevedor)
                
                const midia = MessageMedia.fromFilePath(`//adcserver02/Files/BoletoHoepers/${this.nomeBoleto}`);

                await globais.client.sendMessage(`${this.telefone}@c.us`, midia)
                await globais.client.sendMessage(`${this.telefone}@c.us`, `*OLÁ, SEU BOLETO CHEGOU!!!* 👆🏼`);
                await globais.client.sendMessage(`${this.telefone}@c.us`, `Para gerar um novo boleto para as próximas parcelas (Se houver), acesse: https://portal.hoepers.com`);
                await globais.client.sendMessage(`${this.telefone}@c.us`, `Atenciosamente,`);
				await globais.client.sendMessage(`${this.telefone}@c.us`, '*HOEPERS*🤝🏼');
                console.log('Teste')

            } catch {
                e => (console.log(e))
            }
        })
    }
}

module.exports = { WhatsApp };