const db = require("../database/dbConfig");

function findRating() {
	return db("ratings as r")
		.join("howtodos as h", "h.id", "r.howtodos_id")
		.join("users as u", "u.id", "r.howtodos_id")
		.select("r.rating", "r.description", "u.email", "h.title");
}

function findRatingBy(ID) {
	return db("ratings as r")
		.where("r.howtodos_id", ID)
		.join("howtodos as h", "h.id", "r.howtodos_id")
		.join("users as u", "u.id", "r.user_id")
		.select(
			"r.rating",
			"u.email",
			"r.description"
		); //displaying only one description, can't display both?!
}
function addRating(rating) {
	return db("ratings")
		.insert(rating)
		.then(([id]) => {
			return db("ratings").where(id, "id").first();
		});
}

function remove(id) {
	return db("ratings").where({ id }).del();
}

function update(id, change) {
	return db("ratings").where({ id }).update(change);
}

module.exports = {
	findRatingBy,
	findRating,
	addRating,
	remove,
	update,
};
