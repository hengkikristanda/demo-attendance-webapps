const CommonComponentServices = require("../services/CommonComponentServices");
const SectionContentService = require("../services/SectionContent/SectionContentService");
const TabListItemService = require("../services/TabList/TabListItemService");
const { WEB_PAGE_TITLE } = require("../utils/Constants");

const webPageId = "b7cc04c3-a10c-11ef-b867-9e406641108e";
const currentPage = {
	id: "Struktur Organisasi",
	en: "Organizational Structure",
	ja: "組織構造",
	ko: "조직 구조",
	zh: "组织架构",
};

const getOrganizationalStructure = async (req, res) => {
	try {
		const selectedLanguage = req.language;

		res.locals.organizationalStructure = await CommonComponentServices.getOrganizationalStructure(req);

		// Common components
		const navBarMenuList = await CommonComponentServices.getWebMenu(req.language);
		res.locals.webMenuList = navBarMenuList;
		res.locals.footerTranslation = await CommonComponentServices.getFooter(req);
		res.locals.contactInfo = await CommonComponentServices.getContactInfo();
		res.locals.companyInfo = await CommonComponentServices.getCompanyInfo();

		// Render the index page
		return res.render("aboutUs/organizationalStructure/index", {
			title: `${WEB_PAGE_TITLE} ${currentPage[selectedLanguage]}`,
			selectedLanguage,
		});
	} catch (error) {
		console.log(error);
	}
	return res.redirect("/error");
};

module.exports = {
	getOrganizationalStructure,
};
