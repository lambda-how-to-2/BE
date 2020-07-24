exports.up = async function (knex) {
	return knex.schema
		.createTable("howtodos", (table) => {
			table.increments();
			table.string("title").notNullable();
			table.string("author").notNullable();
			table.text("description").notNullable();
		})
		.createTable("raitings", (table) => {
			table.increments();
			table.int("raiting").notNullable();
			table.text("description");
			table
				.int("howtodos_id")
				.unsigned()
				.notNullable()
				.references("id")
				.inTable("howtodos")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");

			table
				.int("user_id")
				.unsigned()
				.notNullable()
				.references("id")
				.inTable("users")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists("raitings")
		.dropTableIfExists("howtodos");
};
