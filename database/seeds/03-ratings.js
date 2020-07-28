exports.seed = function (knex) {
	return knex("ratings").insert([
		{
			rating: 3,
			description:
				"Tried this life hack, but unfortunately I didn't like the bitter test of coffee grinds that much. ",
			howtodos_id: 1,
			user_id: 1,
		},
		{
			rating: 5,
			description:
				"Chewing gum to conentrate is the best thing I have ever tried! Thanks gor the great idea!",
			howtodos_id: 2,
			user_id: 1,
		},
		{
			rating: 1,
			description: "Don't recomment!",
			howtodos_id: 2,
			user_id: 2,
		},
	]);
};
