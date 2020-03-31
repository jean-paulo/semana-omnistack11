const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
    //validação
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(), // é uma String e é obrigatório
        email: Joi.string().required().email(), //string, obrigatório e do tipo email
        whatsapp: Joi.string().required().min(10).max(11), //tipo numérico, obrigatório e com no minimo 10 e max 11 caracteres
        city: Joi.string().required(),
        uf: Joi.string().required().length(2), 
    })
}), OngController.create); //celebrate tem que ser passado primeiro, para que possa ser executado antes da criação da ONG


routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page:Joi.number(),
    })
}), IncidentController.index);



routes.post('/incidents', IncidentController.create);


routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]:Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);

//deixando as rotas disponiveis para que o index/aplicação possa acessá-las
module.exports = routes;

