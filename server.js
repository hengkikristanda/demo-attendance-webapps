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
const pageRoutes = require("./src/routes/pageRoutes");
const cmsRoutes = require("./src/routes/cmsRoutes.js");
const authRoutes = require("./src/routes/authRoutes.js");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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
				supportedLngs: ["id", "en", "ja", "ko", "zh"],
				preload: ["id"],
				defaultNS: "footer",
				ns: [
					"footer",
					"alumniesSection",
					"lecturerSection",
					"newsSection",
					"homeHero",
					"historyHero",
					"complaint",
					"dutiesHero",
					"ourPurposeHero",
					"organizationalStructure",
					"ourLeadersHero",
					"training",
					"publicComment",
					"alumni",
					"marketingInnovationTechnologyHeroSection",
					"marketingInnovationTechnologyGroupSection",
					"marketingInnovationTechnologySummarySection",
					"marketingInnovationTechnologyOverviewSection",
					"marketingInnovationTechnologyStudentActivitiesSection",
					"marketingInnovationTechnologyCareerImpactSection",
					"SafetyRiskEngHeroSection",
					"SafetyRiskEngGroupSection",
					"SafetyRiskEngSummarySection",
					"SafetyRiskEngOverviewSection",
					"SafetyRiskEngStudentActivitiesSection",
					"SafetyRiskEngCareerImpactSection",
					"d3TransportasiJalanHeroSection",
					"d3TransportasiJalanGroupSection",
					"d3TransportasiJalanSummarySection",
					"d3TransportasiJalanOverviewSection",
					"d3TransportasiJalanStudentActivitiesSection",
					"d3TransportasiJalanCareerImpactSection",
					"d3TransportasiKeretaApiHeroSection",
					"d3TransportasiKeretaApiGroupSection",
					"d3TransportasiKeretaApiSummarySection",
					"d3TransportasiKeretaApiOverviewSection",
					"d3TransportasiKeretaApiStudentActivitiesSection",
					"d3TransportasiKeretaApiCareerImpactSection",
				],
				detection: {
					order: ["querystring", "cookie"],
					caches: ["cookie"],
				},
				debug: false,
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

const sequelizeInit = sequelize.sync({ force: false }).then(() => {
	console.log("Database synced");
});

Promise.all([i18nextInit, sequelizeInit])
	.then(() => {
		console.log("All initializations complete. Starting server...");

		app.use(cookieParser());
		app.use(i18nextMiddleware.handle(i18next));

		app.set("view engine", "ejs");
		app.set("views", "./src/views");

		app.use(
			session({
				secret: "PwQidkDwoPs",
				resave: false,
				saveUninitialized: true,
				cookie: { secure: false },
			})
		);
		app.use(flash());
		app.use(express.json());
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(express.static("public"));
		app.use(authRoutes);
		app.use(pageRoutes);
		app.use(cmsRoutes);
		app.use((err, req, res, next) => {
			console.error("EJS Rendering Error:", err.message);
			console.log(err.message);

			// Redirect to the error page with a 500 status code or any other appropriate response code
			res.redirect(`/error`);
		});

		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	})
	.catch((err) => {
		console.error("Error during initialization:", err);
	});
