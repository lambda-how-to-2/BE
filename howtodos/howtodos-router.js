const express = require("express");

const Howtodos = require("./howtodos-model.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
	try {
		const lifehacks = await Howtodos.find();
		res.json(lifehacks);
	} catch (err) {
		next(err);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const lifehack = await Howtodos.findById(req.params.id);
		if (!lifehack) {
			return res.status(404).json({
				message: "No lifehack is found.",
			});
		}
		console.log(req.params.id);
		res.json(lifehack);
	} catch (err) {
		next(err);
	}
});

router.get("/:id/ratings", async (req, res, next) => {
	try {
		const rating = await Howtodos.findRatingBy(req.params.id);

		if (!rating) {
			return res.status(404).json({
				message: "No rating is found.",
			});
		}
		res.json(rating);
	} catch (err) {
		next(err);
	}
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
