let express = require("express");
let app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

app.use((req, res, next) => {
	const logger = `${req.method} ${req.path} - ${req.ip}`;
	console.log(logger);

	next();
});
console.log("Hello World");

app.get("/", (req, res) => {
	const absolutePath = __dirname + "/views/index.html";
	res.sendFile(absolutePath);
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
	const message = "Hello json";
	if (process.env.MESSAGE_STYLE === "uppercase") {
		res.json({ message: message.toUpperCase() });
	} else {
		res.json({ message });
	}
});

app.get(
	"/now",
	(req, res, next) => {
		req.time = new Date().toString();
		next();
	},
	(req, res) => {
		res.json({ time: req.time });
	}
);

app.get("/:word/echo", (req, res) => {
	const word = req.params.word;
	res.json({ echo: word });
});

app.use(bodyParser.urlencoded({ extended: false }));

app
	.get("/name", (req, res) => {
		const first = req.query.first;
		const last = req.query.last;
		let name;
		if (first && last) {
			name = `${first} ${last}`;
		}
		if (name) {
			res.json({ name });
		} else {
			res.json({ error: "No name provided" });
		}
	})
	.post("/name", (req, res) => {
		const { first, last } = req.body;
		let name;
		if (first && last) {
			name = `${first} ${last}`;
		}
		if (name) {
			res.json({ name });
		} else {
			res.json({ error: "No name provided" });
		}
	});

module.exports = app;
