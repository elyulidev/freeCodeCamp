const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const URL = sequelize.define(
	"url",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		link: {
			type: DataTypes.TEXT,
			unique: true,
			allowNull: false,
		},
	},
	{
		tableName: "url",
		timestamps: false,
	}
);

module.exports = URL;
