const CommonComponentServices = require("../services/CommonsComponentServices");
const LeadersService = require("../services/Leaders/LeadersService");
const { WEB_PAGE_TITLE } = require("../utils/Constants");

const webPageId = "4162d810-a167-11ef-b867-9e406641108e";
const currentPage = {
	id: "Pemimpin Kami",
	en: "Our Leaders",
	ja: "私たちのリーダー",
	ko: "우리의 지도자들",
	zh: "我们的领导",
};

const getLeaders = async (req, res) => {
	try {
		const selectedLanguage = req.language;

		res.locals.ourLeadersHeroTitle = await CommonComponentServices.getOurLeadersHero(req);

		let ourLeadersList = await LeadersService.findAllInLeadersView();
		ourLeadersList = ourLeadersList.map((leader) => ({
			id: leader.id,
			fullName: leader["full_name"],
			job: leader["job_position"],
			pos: leader.pos,
			imageUrl: leader["image_id"]
				? `/img/leaders/${leader["image_id"]}.${leader["mime_type"].split("/")[1]}`
				: `/img/profile-picture-placeholder.jpeg`,
			mimeType: leader["mime_type"],
		}));
		res.locals.ourLeadersList = ourLeadersList;

		// Common components
		const navBarMenuList = await CommonComponentServices.getWebMenu(req.language);
		res.locals.webMenuList = navBarMenuList;
		res.locals.footerTranslation = await CommonComponentServices.getFooter(req);
		res.locals.contactInfo = await CommonComponentServices.getContactInfo();
		res.locals.companyInfo = await CommonComponentServices.getCompanyInfo();

		// Render the index page
		return res.render("aboutUs/ourLeaders/index", {
			title: `${WEB_PAGE_TITLE} ${currentPage[selectedLanguage]}`,
			selectedLanguage,
		});
	} catch (error) {
		console.log(error);
	}
	return res.redirect("/error");
};

module.exports = {
	getLeaders,
};
