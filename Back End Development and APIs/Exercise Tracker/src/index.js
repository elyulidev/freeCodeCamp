const express = require("express");
const app = express();
const cors = require("cors");
const { sequelize } = require("./config/dbConnection");
const path = require("path");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config({ path: path.join(__dirname, "config", ".env") });
require("./models/index");
//middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

//routes
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

const main = async () => {
	try {
		await sequelize.sync({ force: false });
		const listener = app.listen(process.env.PORT || 3000, () => {
			console.log("Your app is listening on port " + listener.address().port);
		});
	} catch (error) {
		console.log("Unable to connect to the database:", error);
		process.exit(1);
	}
};

main();
