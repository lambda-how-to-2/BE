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

module.exports = {
	find,
	findById,
	remove,
	add,
	update,
};
