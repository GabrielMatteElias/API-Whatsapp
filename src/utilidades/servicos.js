const whatsappConexao = require("./conectaWhats.js");

async function executa() {
    console.log('oi')
    whatsappConexao.client.on('disconnected', (reason) => {
        sessionData = null;
        try {

            // Destroy actual browser
            client.destroy()

            //delete session path
            fs.rmdirSync(filePath, { recursive: true });

            // Send command to restart the instance
            setTimeout(() => {
                connectWpp()
            }, 3000)

        } catch (error) {
            console.error('Error on session finished. %s', error);
        }
    });
}

module.exports = { executa };