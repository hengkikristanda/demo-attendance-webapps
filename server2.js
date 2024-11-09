const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const sequelize = require("./src/config/database.js");
const flash = require("connect-flash");
const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const i18nextMiddleware = require("i18next-http-middleware");
const router = require("./src/routes/router.js");
const pageRoutes = require("./src/routes/pageRoutes.js");

const port = process.env.PORT || 3000;

const app = express();
dotenv.config();

const i18nextInit = new Promise((resolve, reject) => {
	i18next
		.use(Backend)
		.use(i18nextMiddleware.LanguageDetector)
		.init(
			{
				backend: {
					loadPath: "./locales/{{lng}}/{{ns}}.json",
				},
				fallbackLng: "id",
				supportedLngs: ["id", "en"],
				preload: ["id", "en"],
				defaultNS: "navbar",
				ns: ["navbar", "footer"],
				detection: {
					order: ["querystring", "cookie"],
					caches: ["cookie"],
				},
				debug: true,
			},
			(err) => {
				if (err) {
					reject(err);
				} else {
					console.log("i18next initialized successfully.");
					resolve();
				}
			}
		);
});

app.use(cookieParser());
app.use(i18nextMiddleware.handle(i18next));

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

// Middleware to serve static files (e.g., CSS, JavaScript, images)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// app.use(router);
app.use(pageRoutes);

sequelize.sync({ force: false }).then(() => {
	console.log("Database synced");

	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});
