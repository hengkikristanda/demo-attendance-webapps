const CommonComponentServices = require("../services/CommonsComponentServices");
const SectionContentService = require("../services/SectionContent/SectionContentService");
const TabListItemService = require("../services/TabList/TabListItemService");
const { WEB_PAGE_TITLE } = require("../utils/Constants");

const webPageId = "f4b574d6-a0ae-11ef-b867-9e406641108e";
const currentPage = {
	id: "Tugas & Fungsi",
	en: "Duties & Functions",
	ja: "任務と機能",
	ko: "임무 및 기능",
	zh: "职责与功能",
};

const getDuties = async (req, res) => {
	try {
		const selectedLanguage = req.language;

		res.locals.dutiesHero = await CommonComponentServices.getDutiesHero(req);

		const tabListItemId = "e5776fdd-a109-11ef-b867-9e406641108e";

		let tabListItems = await TabListItemService.findAllByTabListId(tabListItemId);

		if (selectedLanguage.toLowerCase() != "id") {
			const tempItems = [];
			for (listItem of tabListItems) {
				let data = await TabListItemService.findOneTranslationByTabListItemId(
					listItem.id,
					selectedLanguage
				);
				tempItems.push(data);
			}
			tabListItems = tempItems;
		}

		res.locals.tabListItems = tabListItems;

		// Common components
		const navBarMenuList = await CommonComponentServices.getWebMenu(req.language);
		res.locals.webMenuList = navBarMenuList;
		res.locals.footerTranslation = await CommonComponentServices.getFooter(req);
		res.locals.contactInfo = await CommonComponentServices.getContactInfo();
		res.locals.companyInfo = await CommonComponentServices.getCompanyInfo();

		// Render the index page
		return res.render("aboutUs/duties/index", {
			title: `${WEB_PAGE_TITLE} ${currentPage[selectedLanguage]}`,
			selectedLanguage,
		});
	} catch (error) {
		console.log(error);
	}
	return res.redirect("/error");
};

module.exports = {
	getDuties,
};
