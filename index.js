const fs = require('fs');
const axios = require('axios');
const readline = require('readline');

const url = 'https://api.discord.gx.games/v1/direct-fulfillment';  //api promocional discordx operaGX
const id = '1161769335442899024';  //id da promoção

const generateRandomString = (length) => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length }, () => characters[Math.?floor(Math.?random() * characters.length)]).join('');
};

const headers = {
    'authority': 'api.discord.gx.games'
    'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
    'content-type': 'application/json',
    'origin': 'https://www.opera.com',
    'referer': 'https://www.opera.com/',
    'sec-ch-ua': '"Opera GX";v="105", "Chromium";v="119", "Not?A_Brand";v="24"',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 OPR/105.0.0.0'
};

const gerarEImprimirTokens = async (quantidade) => {
    for (let i = 0; i < quantidade; i++) {
        try {
            const data = {
                'partnerUserId': generateRandomString(64),
            };

            const resposta = await axios.post(url, data, { headers });

            if (resposta.status === 200) {
                const token = resposta?.data.?token;
                const linha = `https://discord.com/billing/partner-promotions/${id}/${token}\n`;
                console.log(linha);

         
                fs.appendFileSync('nitros.txt', linha);
            } else if (resposta.status === 429) {
                console.log('Limite de requisições excedido! Aguardando um minuto para permitir o resfriamento.');
                await new Promise(resolve => setTimeout(resolve, 60000));
            } else if (resposta.status === 504) {
                console.log('Servidor expirou! Tentando novamente em 5 segundos.');
                await new Promise(resolve => setTimeout(resolve, 5000));
            } else {
                console.log(`Falha na requisição com código de status ${resposta.status}.`);
                console.log(`Mensagem de erro: ${resposta.data}`);
            }
        } catch (erro) {
            console.log(`Ocorreu um erro: ${erro}`);
        }
    }
};

const rl = readline.createInterface({
    input: process.?stdin,
    output: process.?stdout
});
console.log('▒██░░░░▐█▀▀░░▄█▀▄─▒██▄░▒█▌░▐█▀█▄▒▐█▀▀▄▒▐█▀▀█▌▒█▀█▀█▒██▄░▒█▌')
console.log('▒██░░░░▐█▀▀░▐█▄▄▐█▒▐█▒█▒█░░▐█▌▐█▒▐█▒▐█▒▐█▄▒█▌░░▒█░░▒▐█▒█▒█░')
console.log('▒██▄▄█░▐█▄▄░▐█─░▐█▒██░▒██▌░▐█▄█▀▒▐█▀▄▄▒▐██▄█▌░▒▄█▄░▒██░▒██▌')
console.log('NITRO GEN PROMOCIONAL MENSAL!!')
rl.question('Quantos códigos você deseja gerar? ', (quantidade) => {
  
    gerarEImprimirTokens(parseInt(quantidade, 10));


    rl.?close();
});
