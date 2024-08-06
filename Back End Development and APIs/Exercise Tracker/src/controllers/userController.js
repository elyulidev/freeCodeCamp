const {
	getAllUsers,
	createOneUser,
	createExerciseForUser,
	getUserLogs,
} = require("../database/userDB");
const { get } = require("../routes/userRoutes");

const getAllUsersController = async (req, res, next) => {
	try {
		const users = await getAllUsers();
		return res.status(200).json([...users]);
	} catch (error) {
		next(error);
	}
};

const createUserController = async (req, res, next) => {
	try {
		const username = req.body.username;

		if (!username) {
			throw {
				name: "BadRequestError",
				status: 400,
				message: "Username is required",
			};
		}
		const newUser = await createOneUser(username);
		return res
			.status(200)
			.json({ username: newUser.username, _id: newUser.id });
	} catch (error) {
		next(error);
	}
};

const createExerciseForUserController = async (req, res, next) => {
	try {
		const userId = req.params._id;
		const description = req.body.description;
		const duration = req.body.duration;
		const date = req.body?.date ? new Date(req.body.date) : new Date();

		if (!userId || !description || !duration || !date) {
			throw {
				name: "BadRequestError",
				status: 400,
				message: "UserId and Exercise are required",
			};
		}

		const exercise = {
			description,
			duration,
			date,
		};

		const newExercise = await createExerciseForUser(userId, exercise);
		return res.status(200).json(newExercise);
	} catch (error) {
		next(error);
	}
};

const getUserLogsController = async (req, res, next) => {
	try {
		const userId = req.params._id;
		const from = req.query.from;
		const to = req.query.to;
		const limit = req.query.limit;

		console.log("userId", userId);
		console.log("from", from);
		console.log("to", to);
		console.log("limit", limit);

		const userLogs = await getUserLogs(userId, from, to, limit);

		return res.status(200).json(userLogs);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllUsersController,
	createUserController,
	createExerciseForUserController,
	getUserLogsController,
};
