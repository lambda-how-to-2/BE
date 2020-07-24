const db = require("../database/dbConfig");

function find() {
	return db("howtodos");
}

function findById(ID) {
	return db("howtodos").where("howtodos.id", ID).first();
}

function add(howtodo) {
	return db("howtodos")
		.insert(howtodo)
		.then((id) => {
			return findById(id[0]);
		});
}

function update(howtodo, ID) {
	return db("howtodos").where({ id: ID }).update(howtodo);
}

function remove(ID) {
	return db("howtodos").where({ id: ID }).del();
}

function findRating() {
	return db("ratings as r")
		.leftJoin("howtodos as h", "h.id", "r.howtodos_id")
		.select("r.*");
}

function findRatingBy(ID) {
	return db("ratings as r")
		.where("r.id", ID)
		.join("howtodos as h", "h.id", "r.howtodos_id")
		.select("r.id");
}

module.exports = {
	find,
	findById,
	remove,
	add,
	update,
	findRatingBy,
	findRating,
};
