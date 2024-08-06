const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");

const Exercise = sequelize.define(
	"exercise",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		description: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		duration: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "exercise",
		timestamps: false,
	}
);

module.exports = { Exercise };
