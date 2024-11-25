const CommonComponentServices = require("../services/CommonComponentServices");
const SectionContentService = require("../services/SectionContent/SectionContentService");
const { WEB_PAGE_TITLE } = require("../utils/Constants");

const webPageId = "008f5bcc-9f05-11ef-b867-9e406641108e";
const currentPage = {
	id: "Sejarah Kami",
	en: "Our History",
	ja: "私たちの歴史",
	ko: "우리의 역사",
	zh: "我们的历史",
};

const getHistory = async (req, res) => {
	const selectedLanguage = req.language;

	res.locals.historyHero = await CommonComponentServices.getHistoryHero(req);

	// Section
	let historySectionList;
	if (selectedLanguage.toLowerCase() == "id") {
		historySectionList = await SectionContentService.findAllInViewByWebPageId(webPageId);
	} else {
		historySectionList = await SectionContentService.findAllTranslationInViewByWebPageId(
			webPageId,
			selectedLanguage
		);
	}

	historySectionList = historySectionList.map((history) => {
		if (history.image_id && history.mime_type) {
			history.imageUrl = `/img/sections/${history.image_id}.${history.mime_type.split("/")[1]}`;
		}
		return history;
	});
	res.locals.historySectionList = historySectionList;

	// Common components
	const navBarMenuList = await CommonComponentServices.getWebMenu(req.language);
	res.locals.webMenuList = navBarMenuList;
	res.locals.footerTranslation = await CommonComponentServices.getFooter(req);
	res.locals.contactInfo = await CommonComponentServices.getContactInfo();
	res.locals.companyInfo = await CommonComponentServices.getCompanyInfo();

	// Render the index page
	res.render("aboutUs/history/index", {
		title: `${WEB_PAGE_TITLE} ${currentPage[selectedLanguage]}`,
		selectedLanguage,
	});
};

module.exports = {
	getHistory,
};
