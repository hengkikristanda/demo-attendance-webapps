const CommonComponentServices = require("../services/CommonComponentServices");
const { WEB_PAGE_TITLE } = require("../utils/Constants");
const AlumniService = require("../services/AlumniService");

const currentPage = {
	id: "Alumni",
	en: "Alumni",
	ja: "卒業生",
	ko: "동문",
	zh: "我们的领导",
};

const getAlumni = async (req, res) => {
	try {
		const selectedLanguage = req.language;

		res.locals.alumniTranslation = await CommonComponentServices.getAlumni(req);

		// Common components
		const navBarMenuList = await CommonComponentServices.getWebMenu(req.language);
		res.locals.webMenuList = navBarMenuList;
		res.locals.footerTranslation = await CommonComponentServices.getFooter(req);
		res.locals.contactInfo = await CommonComponentServices.getContactInfo();
		res.locals.companyInfo = await CommonComponentServices.getCompanyInfo();

		let alumniList = await AlumniService.findAllAlumniView();

		// Map the desired attribute (e.g., name) to a new object
		alumniList = alumniList.map((alumni) => {
			return {
				id: alumni.id,
				fullName: alumni["full_name"],
				generation: alumni.generation,
				job: alumni["job_position"],
				pos: alumni.pos,
				imageUrl: `/img/alumnies/${alumni["image_id"]}.${alumni["mime_type"].split("/")[1]}`,
				mimeType: alumni["mime_type"],
			};
		});

		res.locals.alumniList = alumniList;

		const alertMessage = req.flash("alertMessage");

		// Render the index page
		return res.render("alumni/index", {
			title: `${WEB_PAGE_TITLE} ${currentPage[selectedLanguage]}`,
			selectedLanguage,
			alertMessage: alertMessage[0],
		});
	} catch (error) {
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Something went wrong, please try again in a few minutes.",
			className: "danger",
			actionLinkLabel: "Back to Home",
			actionLink: "/",
		});
		return res.redirect("/error");
	}
};

module.exports = {
	getAlumni,
};
