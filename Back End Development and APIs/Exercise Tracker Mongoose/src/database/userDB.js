const { Exercise } = require("../models/Exercise");
const { User } = require("../models/User");

const getAllUsers = async () => {
	const users = await User.find({});

	return users;
};

const createOneUser = async (username) => {
	const findUsername = await User.findOne({
		where: { username },
	});

	if (findUsername)
		throw {
			error: "BadRequestError",
			status: 400,
			message: "Username already exists",
		};

	const newUser = new User({ username }).save();

	return newUser;
};

const createExerciseForUser = async (userId, exercise) => {
	const user = await User.findById(userId);

	if (!user) {
		throw { error: "NotFoundError", status: 404, message: "User not found" };
	}

	exercise.username = user.username;

	const newExercise = await Exercise.create(exercise);

	return {
		_id: user?._id,
		username: newExercise?.username,
		date: new Date(newExercise?.date).toDateString(),
		duration: newExercise?.duration,
		description: newExercise?.description,
	};
};

const getUserLogs = async (userId, startDate, endDate, limit) => {
	const user = await User.findById(userId);

	if (!user) {
		throw { error: "NotFoundError", status: 404, message: "User not found" };
	}

	let options = { username: user.username };
	if (startDate && endDate) {
		options.date = {
			$gte: startDate,
			$lte: endDate,
		};
	}

	const findExercisesByUsername = await Exercise.find(options)
		.limit(limit)
		.select({ description: true, duration: true, date: true });

	const logs = findExercisesByUsername.map((log) => ({
		description: log.description,
		duration: log.duration,
		date: new Date(log.date).toDateString(),
	}));

	return {
		_id: user._id,
		username: user.username,
		count: logs.length,
		log: logs,
	};
};
/* const getUserLogs = async (userId, startDate, endDate, limit) => {
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
}; */

module.exports = {
	getAllUsers,
	createOneUser,
	createExerciseForUser,
	getUserLogs,
};
