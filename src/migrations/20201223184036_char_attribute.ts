import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable('char_attribute', table => {
        table.increments()
        table.integer('charId').unsigned().notNullable()
        table.foreign('charId').references('char.id')
        table.integer('attributeId').unsigned().notNullable()
        table.foreign('attributeId').references('attribute.id')
        table.integer('value').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('char_attribute')
}

