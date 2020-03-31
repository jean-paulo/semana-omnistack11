const crypto = require('crypto'); //pacote que vem com o node utilizado para criptografia vamos utiliza-lo para gerar um numero aleatório para o id das ongs

module.exports = function generateUniqueId(){
    return crypto.randomBytes(4).toString('HEX');
}