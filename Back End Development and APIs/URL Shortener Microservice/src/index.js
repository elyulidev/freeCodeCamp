const express = require("express");
const cors = require("cors");
const path = require("node:path");
const sequelize = require("./config/databaseConnection");
require("dotenv").config({ path: path.join(__dirname, "config", ".env") });
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
	res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
	res.json({ greeting: "hello API" });
});

app.use("/api/shorturl", require("./routes/urlRoutes"));

const main = async () => {
	try {
		await sequelize.sync({ force: false });
		app.listen(port, function () {
			console.log(`Listening on port ${port}`);
		});
	} catch (error) {
		console.log("error", error);
	}
};

main();
