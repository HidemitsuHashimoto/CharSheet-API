import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable('user', table => {
        table.increments()
        table.string('email').notNullable()
        table.string('password').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('user')
}

