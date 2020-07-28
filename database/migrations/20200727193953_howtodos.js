exports.up = async function (knex) {
	await knex.schema.createTable("users", (users) => {
		users.increments();
		users.text("email").notNullable().unique();
		users.text("password").notNullable();
	});
	await knex.schema.createTable("howtodos", (table) => {
		table.increments();
		table.string("title").notNullable();
		table.string("author").notNullable();
		table.text("description").notNullable();
		table.text("image_url").default(null);
	});
	await knex.schema.createTable("ratings", (table) => {
		table.increments();
		table.integer("rating").notNullable();
		table.text("description");
		table
			.integer("howtodos_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("howtodos")
			.onDelete("CASCADE")
			.onUpdate("CASCADE");

		table
			.integer("user_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("users")
			.onDelete("CASCADE")
			.onUpdate("CASCADE");
	});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists("ratings")
		.dropTableIfExists("users")
		.dropTableIfExists("howtodos");
};
