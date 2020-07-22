exports.up = function (knex) {
	return knex.schema.createTable("howtodos", (table) => {
		table.increments();
		table.string("title").notNullable();
		table.string("author").notNullable();
		table.text("description").notNullable();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists("howtodos");
};
