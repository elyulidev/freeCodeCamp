const URL = require("../model/URL");

const createURLDB = async (urlString) => {
	const url = await URL.findOne({ where: { link: urlString } });
	if (url) return { id: url.id };

	const { id } = await URL.create({ link: urlString });
	return { id };
};

const findURLDB = async (urlId) => {
	const url = await URL.findOne({ where: { id: urlId } });
	if (url) return url;
	throw new Error("URL not found");
};

module.exports = { createURLDB, findURLDB };
