
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments(); //cria uma chave primaria com auto incremento
        
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();

        //relacionamento com chave estrangeira
        table.foreign('ong_id').references('id').inTable('ongs');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
