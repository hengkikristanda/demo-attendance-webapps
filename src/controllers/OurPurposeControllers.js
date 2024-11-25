const CommonComponentServices = require("../services/CommonsComponentServices");
const SectionContentService = require("../services/SectionContent/SectionContentService");
const TabListItemService = require("../services/TabList/TabListItemService");
const { WEB_PAGE_TITLE } = require("../utils/Constants");

const webPageId = "141365fe-a109-11ef-b867-9e406641108e";
const currentPage = {
	id: "Tujuan Kami",
	en: "Our Purpose",
	ja: "私たちの目的",
	ko: "우리의 목적",
	zh: "我们的目的",
};

const getOurPurpose = async (req, res) => {
	try {
		const selectedLanguage = req.language;

		res.locals.ourPurposeHero = await CommonComponentServices.getOurPurposeHero(req);

		const tabListItemId = "236ff3e6-a0d8-11ef-b867-9e406641108e";

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

		return res.render("aboutUs/ourPurpose/index", {
			title: `${WEB_PAGE_TITLE} ${currentPage[selectedLanguage]}`,
			selectedLanguage,
		});
	} catch (error) {
		console.log(error);
	}
	return res.redirect("/error");
};

module.exports = {
	getOurPurpose,
};
