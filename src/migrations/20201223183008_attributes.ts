import * as Knex from "knex";

const attributeList = [
    {title: 'Força'},
    {title: 'Inteligência'}
]

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('attribute', table => {
        table.increments()
        table.string('title').notNullable()
    })

    return await knex('attribute').insert(attributeList)
}


export async function down(knex: Knex): Promise<void> {
    await knex('attribute').delete()
    return await knex.schema.dropTable('attribute')
}

