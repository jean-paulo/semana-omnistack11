const generateUniqueId = require ('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {

    async index(resquest, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body; //acessa o corpo da requisição

        const id = generateUniqueId(); //gera 4 bytes de caracteres e converte para Hexadecimal

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