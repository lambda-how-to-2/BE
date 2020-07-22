const db = require("../database/dbConfig");

function find() {
	return db("howtodos");
}

function findById(ID) {
	return db("howtodos").where("howtodos.id", ID).first();
}

function add(lifehack) {
	return db("howtodos")
		.insert(lifehack)
		.then((id) => {
			return findById(id[0]);
		});
}

function update(lifehack, ID) {
	return db("howtodos").where({ id: ID }).update(lifehack);
}

function remove(ID) {
	return db("howtodos").where({ id: ID }).del();
}

module.exports = {
	find,
	findById,
	remove,
	add,
	update,
};
