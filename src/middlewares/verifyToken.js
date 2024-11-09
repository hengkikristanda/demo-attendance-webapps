const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const token = req.cookies.auth;
	console.log(token);
	if (!token) {
		console.log("Token not available");
		return res.status(403).redirect("/users/login?error=forbidden");
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded; // Store user info in request object
		next();
	} catch (error) {
		return res.status(401).redirect("users/login?error=forbidden", {
			title: "PTDI STTD Account",
			errorMessage: "Session expired. Please log in again.",
		});
	}
};

module.exports = verifyToken;
