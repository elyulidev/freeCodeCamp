const { Sequelize } = require("sequelize");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const sequelize = new Sequelize(
	process.env.POSTGRES_DB,
	process.env.POSTGRES_USER,
	process.env.POSTGRES_PWD,
	{
		host: process.env.HOST,
		dialect: process.env.POSTGRES_DIALECT,
		port: process.env.POSTGRES_PORT,
	}
);

module.exports = { sequelize };
