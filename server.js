const express = require("express");
const session = require("express-session");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const port = process.env.PORT || 3000;

const router = require("./src/routes/router");

app.use(cookieParser());
app.use(router);

// Set the view engine to ejs
app.set("view engine", "ejs");

// Set the directory for the EJS templates
app.set("views", "./src/views");

app.use(
	session({
		secret: "PwQidkDwoPs", // Replace with your secret key
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false }, // Set to true if using HTTPS
	})
);

// Middleware to serve static files (e.g., CSS, JavaScript, images)
app.use(express.static("public"));

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
