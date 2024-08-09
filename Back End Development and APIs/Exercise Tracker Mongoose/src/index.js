const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const errorHandler = require("./middlewares/errorHandler");
const mongoose = require("mongoose");

require("dotenv").config({ path: path.join(__dirname, "config", ".env") });

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
		await mongoose.connect(process.env.MONGO_URI);
		const listener = app.listen(process.env.PORT || 3000, () => {
			console.log("Your app is listening on port " + listener.address().port);
		});
	} catch (err) {
		console.error("Unable to connect to MongoDB. Error: ", err);
	}
};

main();
