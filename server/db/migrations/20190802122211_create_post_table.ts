import * as Knex from "knex";

const TABLE_NAME = "post";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE_NAME, t => {
    t.increments("id");
    t.integer("userId").unsigned();
    t.foreign("userId").references("user.id");
    t.integer("language").notNullable();
    t.text("text");
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE_NAME);
}
