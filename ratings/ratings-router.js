const express = require("express");

const Rating = require("./rating-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
	try {
		const ratings = await Rating.findRating();
		res.json(ratings);
	} catch (err) {
		next(err);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const rating = await Rating.findRatingBy(req.params.id);

		res.json(rating);
	} catch (err) {
		next(err);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const { user_id, howtodos_id, rating, description } = req.body;
		const payload = {
			user_id: user_id,
			howtodos_id: howtodos_id,
			rating: rating,
			description: description,
		};

		const rate = await Rating.addRating(payload);
		res.json({ message: "Thanks for the rating!" });
	} catch (err) {
		next(err);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		await Rating.remove(req.params.id);
		res.status(204).json({ message: "The rating was removed!" });
	} catch (err) {
		next(err);
	}
});

router.put("/:id", async (req, res, next) => {
	try {
		const change = await Rating.update(req.params.id, req.body);
		res.status(201).json(change);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
