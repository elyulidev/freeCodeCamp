const dns = require("node:dns").promises;
const { createURLDB, findURLDB } = require("../database/urlDB");

const createUrlController = async (req, res) => {
	try {
		const urlString = req.body.url;
		const parseUrl = new URL(urlString);
		const hostname = parseUrl.hostname;

		// Check if the URL is valid
		await dns.lookup(hostname);

		const { id } = await createURLDB(urlString);

		return res.json({ original_url: urlString, short_url: id });
	} catch (error) {
		console.log("error>>>", error);
		res.json({ error: "invalid url" });
	}
};

const findUrlAndRedirectController = async (req, res) => {
	try {
		const { id } = await findURLDB(Number(req.params.shorturl));
		const url = await findURLDB(id);

		return res.redirect(url.link);
	} catch (error) {
		//console.log("error>>>", error);
		res.json({ error: error || "url not found" });
	}
};

module.exports = {
	createUrlController,
	findUrlAndRedirectController,
};
