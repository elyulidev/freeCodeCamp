const { Exercise } = require("./Exercise");
const { User } = require("./User");

User.hasMany(Exercise, {
	foreignKey: { name: "userId", allowNull: false },
	as: "log",
	sourceKey: "id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

Exercise.belongsTo(User);
