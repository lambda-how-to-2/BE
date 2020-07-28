exports.seed = function (knex) {
	return knex("users").insert([
		{
			email: "test@test.com",
			password: "test",
		},
		{
			email: "test2@test.com",
			password: "test2",
		},
	]);
};
