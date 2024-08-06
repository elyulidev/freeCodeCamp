const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");

const User = sequelize.define(
	"user",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{
		tableName: "user",
		timestamps: false,
	}
);

module.exports = { User };
