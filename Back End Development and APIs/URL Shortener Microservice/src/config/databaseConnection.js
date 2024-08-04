const path = require("node:path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
	process.env.POSTGRES_DB,
	process.env.POSTGRES_USER,
	process.env.POSTGRES_PWD,
	{
		host: process.env.HOST,
		dialect: process.env.POSTGRES_DIALECT,
		port: process.env.PORT,
	}
);

module.exports = sequelize;
