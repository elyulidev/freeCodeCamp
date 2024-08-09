const router = require("express").Router();
const {
	getAllUsersController,
	createUserController,
	createExerciseForUserController,
	getUserLogsController,
} = require("../controllers/userController");

router.route("/").get(getAllUsersController).post(createUserController);

router.route("/:_id/exercises").post(createExerciseForUserController);

router.route("/:_id/logs").get(getUserLogsController);

module.exports = router;
