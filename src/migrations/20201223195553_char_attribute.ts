import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.alterTable('char_attribute', table => {
        table.unique(['charId', 'attributeId'])
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex('char_attribute').delete()
    return await knex.schema.alterTable('char_attribute', table => {
        table.dropForeign(['charId'])
        table.dropForeign(['attributeId'])
        table.dropUnique(['charId', 'attributeId'])
    })
}

