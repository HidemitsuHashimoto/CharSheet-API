import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('char', table => {
        table.increments()
        table.string('name').notNullable()
        table.enum('gender', ['M', 'F', 'O']).notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('char')
}

