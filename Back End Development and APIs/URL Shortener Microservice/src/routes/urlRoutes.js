const {
	createUrlController,
	findUrlAndRedirectController,
} = require("../controllers/urlController");

const router = require("express").Router();

router.route("/").post(createUrlController);

router.route("/:shorturl").get(findUrlAndRedirectController);

module.exports = router;
