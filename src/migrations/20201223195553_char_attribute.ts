import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('char_attribute', table => {
        table.unique(['charId', 'attributeId'])
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('char_attribute', table => {
        table.dropUnique(['charId', 'attributeId'])
    })
}

