const express = require("express");

const Howtodos = require("./howtodos-model.js");

const router = express.Router();

router.get("/", (req, res) => {
	Howtodos.find()
		.then((lifehack) => {
			res.json(lifehack);
		})
		.catch((err) => {
			res.status(500).json({ message: "Failed to get schemes" });
		});
});

router.get("/:id", (req, res) => {
	const { id } = req.params;

	Howtodos.findById(id)
		.then((lifehack) => {
			if (lifehack) {
				res.json(lifehack);
			} else {
				res
					.status(404)
					.json({ message: "Could not find lifehack with given id." });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: "Failed to get lifehacks" });
		});
});

router.post("/", (req, res) => {
	const newLifehack = req.body;

	Howtodos.add(newLifehack)
		.then((lifehack) => {
			res.status(201).json(lifehack);
		})
		.catch((err) => {
			res.status(500).json({ message: "Failed to create new lifehack" });
		});
});

router.put("/:id", (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	Howtodos.findById(id)
		.then((lifehack) => {
			if (lifehack) {
				Howtodos.update(changes, id).then((updatedLifehack) => {
					res.json(updatedLifehack);
				});
			} else {
				res
					.status(404)
					.json({ message: "Could not find lifehack with given id" });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: "Failed to update lifehack" });
		});
});

router.delete("/:id", (req, res) => {
	const { id } = req.params;

	Howtodos.remove(id)
		.then((deleted) => {
			if (deleted) {
				res.json({ removed: deleted });
			} else {
				res
					.status(404)
					.json({ message: "Could not find lifehack with given id" });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: "Failed to delete lifehack" });
		});
});

module.exports = router;
