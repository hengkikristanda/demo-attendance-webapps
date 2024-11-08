const express = require("express");
const session = require("express-session");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const sequelize = require("./src/config/database.js");
const flash = require("connect-flash");

dotenv.config();

const port = process.env.PORT || 3000;

const router = require("./src/routes/router");
const pageRoutes = require("./src/routes/pageRoutes");

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
app.use(flash());
app.use(express.json());
app.use((req, res, next) => {
	res.locals.message = req.flash("message");
	next();
});

// Middleware to serve static files (e.g., CSS, JavaScript, images)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cookieParser());
// app.use(router);
app.use(pageRoutes);

// app.listen(port, () => {
// 	console.log(`Server is running on port ${port}`);
// });

sequelize.sync({ force: false }).then(() => {
	console.log("Database synced");

	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});
