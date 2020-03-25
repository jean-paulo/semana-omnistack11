const express = require('express');
const cors = require('cors');
const routes = require('./routes'); //importando a variavel routes usando o require utilizamos o ./ para demonstrar que é um arquivo, se não ele será entendido como um pacote 

//instanciando aplicação
const app = express();

app.use(cors());
app.use(express.json()); //para transformar o retorno das requisições em objetos JavaScript
app.use(routes); //importante que essa linha fique abaixo da linha do express

//mandamos a aplicação ouvir a porta 3333
app.listen(3333);


