exports.up = async function (knex) {
	return knex.schema
		.createTable("howtodos", (table) => {
			table.increments();
			table.string("title").notNullable();
			table.string("author").notNullable();
			table.text("description").notNullable();
		})
		.createTable("ratings", (table) => {
			table.increments();
			table.integer("rating");
			table.text("description");
			table
				.integer("howtodos_id")
				.unsigned()
				.notNullable()
				.references("id")
				.inTable("howtodos")
				.onDelete("RESTRICT")
				.onUpdate("CASCADE")

			table
				.integer("user_id")
				.unsigned()
				.notNullable()
				.references("id")
				.inTable("users")
				.onDelete("RESTRICT")
				.onUpdate("CASCADE")

		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists("ratings")
		.dropTableIfExists("howtodos");
};
