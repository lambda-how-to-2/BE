const Howtodos = require('../howtodos/howtodos-model')
const router = require('express').Router()

router.get("/:id", async (req, res, next) => {

    try {
        const rating = await Howtodos.findRatingBy(req.params.id);

        res.json(rating)
    } catch (err) {
        next (err)
    }
});

module.exports = router