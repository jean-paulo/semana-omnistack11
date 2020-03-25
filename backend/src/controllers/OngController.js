const crypto = require('crypto'); //pacote que vem com o node utilizado para criptografia vamos utiliza-lo para gerar um numero aleatório para o id das ongs
const connection = require('../database/connection');

module.exports = {

    async index(resquest, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body; //acessa o corpo da requisição

        const id = crypto.randomBytes(4).toString('HEX'); //gera 4 bytes de caracteres e converte para Hexadecimal

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return response.json({ id });
    }
}