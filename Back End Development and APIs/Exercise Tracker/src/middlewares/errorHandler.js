const objectError = {
	BadRequestError: (error, res) =>
		res
			.status(error?.status || 400)
			.json({ error: error?.message || "Bad Request" }),
	UnauthorizedError: (error, res) =>
		res
			.error?.(error?.status || 401)
			.json({ error: error?.message || "Unauthorized" }),
	ForbiddenError: (error, res) =>
		res
			.status(error?.status || 403)
			.json({ error: error?.message || "Forbidden" }),
	NotFoundError: (error, res) =>
		res
			.status(error?.status || 404)
			.json({ error: error?.message || "Not Found" }),
	InternalServerError: (error, res) =>
		res
			.status(error?.status || 500)
			.json({ error: error?.message || "Internal Server Error" }),
};
const errorHandler = (err, req, res, next) => {
	console.log("errorHandler", err.message);
	const error = objectError[err.name] || objectError.InternalServerError;
	error(err, res);
	next();
};

module.exports = errorHandler;
