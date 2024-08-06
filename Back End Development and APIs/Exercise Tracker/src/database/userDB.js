const { Op } = require("sequelize");
const { Exercise } = require("../models/Exercise");
const { User } = require("../models/User");

const getAllUsers = async () => {
	const users = await User.findAll({ attributes: ["username", "id"] });
	return users.map((user) => ({
		username: user.username,
		_id: user.id,
		//__v: 0,
	}));
};

const createOneUser = async (username) => {
	const newUser = await User.findOrCreate({
		where: { username },
		fields: ["username", "id"],
	});
	//console.log("newUser>>>", newUser[0]);
	return newUser[0];
};

const createExerciseForUser = async (userId, exercise) => {
	const user = await User.findByPk(userId);

	if (!user) {
		throw { error: "NotFoundError", status: 404, message: "User not found" };
	}

	exercise.userId = user.id;
	exercise.username = user.username;

	const newExercise = await Exercise.create(exercise, {
		fields: ["username", "description", "duration", "date", "userId"],
	});

	return {
		_id: newExercise.userId,
		username: newExercise.username,
		description: newExercise.description,
		duration: newExercise.duration,
		date: new Date(newExercise.date).toDateString(),
	};
};

const getUserLogs = async (userId, startDate, endDate, limit) => {
	let options;
	if (startDate && endDate) {
		options = {
			where: {
				date: {
					[Op.between]: [new Date(startDate), new Date(endDate)],
				},
			},
		};
	}

	console.log("options>>>", options);

	const user = await User.findAndCountAll({
		where: { id: userId },
		include: {
			model: Exercise,
			as: "log",
			attributes: ["description", "duration", "date"],
			where: options?.where,
			limit: limit || 5,
		},
	});

	//console.log("user>>>", user);

	if (!user) {
		throw { error: "NotFoundError", status: 404, message: "User not found" };
	}
	const logs = user.rows[0].log.map((log) => ({
		description: log.description,
		duration: log.duration,
		date: new Date(log.date).toDateString(),
	}));

	return {
		_id: user.rows[0].id,
		username: user.rows[0].username,
		count: logs.length,
		log: logs,
	};
};

module.exports = {
	getAllUsers,
	createOneUser,
	createExerciseForUser,
	getUserLogs,
};
