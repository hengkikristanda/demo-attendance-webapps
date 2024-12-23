const { logWithTime } = require("../utils/CommonUtils");
const WebMenuService = require("../services/WebMenuService");
const ContactInfoService = require("../services/ContactInfoService");
const CompanyProfileService = require("../services/CompanyProfileService");

const PARENT_MENU = [
	"1b18313d-9e4f-11ef-b867-9e406641108e",
	"230835f3-9e50-11ef-b867-9e406641108e",
	"4cc7f3bd-9e50-11ef-b867-9e406641108e",
	"67eee352-9e50-11ef-b867-9e406641108e",
];

async function logging(message) {
	await logWithTime(`Detected language: ${message}`);
}

const getCommonComponent = (lang) => {
	let selectedLanguage = lang;
	if (selectedLanguage == undefined) {
		selectedLanguage = "id";
	}

	if (!["en", "id", "zh", "ja", "ko"].includes(selectedLanguage.toLowerCase()))
		selectedLanguage = "id";

	const translations = JSON.parse(
		fs.readFileSync(
			path.join(__dirname, "../translations/navbar/", `${selectedLanguage}.json`),
			"utf8"
		)
	);

	const footerTranslation = JSON.parse(
		fs.readFileSync(
			path.join(__dirname, "../translations/footer/", `${selectedLanguage}.json`),
			"utf8"
		)
	);

	return {
		translations,
		footerTranslation,
	};
};

const getFooter = async (req) => {
	await logging(req.language);

	return {
		location: req.t("footer:location"),
		contactUs: req.t("footer:contactUs"),
		connectWithUs: req.t("footer:connectWithUs"),
	};
};

const getComplaints = async (req) => {
	await logging(req.language);

	return {
		title: req.t("complaint:title"),
		subTitle: req.t("complaint:subTitle"),
		nameLabel: req.t("complaint:nameLabel"),
		emailLabel: req.t("complaint:emailLabel"),
		phoneLabel: req.t("complaint:phoneLabel"),
		complaintLabel: req.t("complaint:complaintLabel"),
		namePlaceholder: req.t("complaint:namePlaceholder"),
		emailPlaceholder: req.t("complaint:emailPlaceholder"),
		phonePlaceholder: req.t("complaint:phonePlaceholder"),
		complaintPlaceholder: req.t("complaint:complaintPlaceholder"),
		attachmentFileLabel: req.t("complaint:attachmentFileLabel"),
		selectFileLabel: req.t("complaint:selectFileLabel"),
		submitLabel: req.t("complaint:submitLabel"),
		chatUs: req.t("complaint:chatUs"),
		chatUsLabel: req.t("complaint:chatUsLabel"),
		visitUs: req.t("complaint:visitUs"),
		visitUsLabel: req.t("complaint:visitUsLabel"),
		callUs: req.t("complaint:callUs"),
		callUsLabel: req.t("complaint:callUsLabel"),
	};
};

const getAlumni = async (req) => {
	await logging(req.language);

	return {
		title: req.t("alumni:title"),
		subTitle: req.t("alumni:subTitle"),
	};
};

const getPublicComment = async (req) => {
	await logging(req.language);

	return {
		title: req.t("publicComment:title"),
		subTitle: req.t("publicComment:subTitle"),
		nameLabel: req.t("publicComment:nameLabel"),
		emailLabel: req.t("publicComment:emailLabel"),
		phoneLabel: req.t("publicComment:phoneLabel"),
		commentLabel: req.t("publicComment:commentLabel"),
		namePlaceholder: req.t("publicComment:namePlaceholder"),
		emailPlaceholder: req.t("publicComment:emailPlaceholder"),
		phonePlaceholder: req.t("publicComment:phonePlaceholder"),
		commentPlaceholder: req.t("publicComment:commentPlaceholder"),
		submitLabel: req.t("publicComment:submitLabel"),
		yourCommentLabel: req.t("publicComment:yourCommentLabel"),
	};
};

const getAlumniSection = async (req) => {
	await logging(req.language);

	return {
		alumni: req.t("alumniesSection:alumni"),
		seeMore: req.t("alumniesSection:seeMore"),
	};
};

const getLecturerSection = async (req) => {
	await logging(req.language);

	return {
		lecturer: req.t("lecturerSection:lecturer"),
		seeMore: req.t("lecturerSection:seeMore"),
	};
};

const getLatestNewsSection = async (req) => {
	await logging(req.language);
	return {
		latestNews: req.t("newsSection:latestNews"),
		seeMore: req.t("newsSection:seeMore"),
	};
};

const getTrainingSection = async (req) => {
	await logging(req.language);
	return {
		title: req.t("training:title"),
		header: req.t("training:header"),
		content: req.t("training:content"),
	};
};

const getWebMenu = async (languageCode) => {
	try {
		const result = await WebMenuService.findAll();
		if (result) {
			const organizedMenu = organizeMenu(result, languageCode);
			return organizedMenu;
			// return JSON.stringify(organizedMenu, null, 2);
		}
	} catch (error) {
		console.log(error);
	}
};

const getHomeHero = async (req) => {
	await logging(req.language);

	return {
		discover: req.t("homeHero:discover"),
	};
};

const getHistoryHero = async (req) => {
	await logging(req.language);

	return {
		ourHistory: req.t("historyHero:history"),
		historyEstablishment: req.t("historyHero:historyEstablishment"),
	};
};

const getMarketingInnovationTechnologyHeroSection = async (req) => {
	await logging(req.language);

	return {
		title: req.t("marketingInnovationTechnologyHeroSection:title"),
	};
};

const getMarketingInnovationTechnologyGroupSection = async (req) => {
	await logging(req.language);

	return {
		overview: req.t("marketingInnovationTechnologyGroupSection:overview"),
		studentActivities: req.t("marketingInnovationTechnologyGroupSection:studentActivities"),
		careerImpact: req.t("marketingInnovationTechnologyGroupSection:careerImpact"),
	};
};

const getMarketingInnovationTechnologySummarySection = async (req) => {
	await logging(req.language);

	return {
		title: req.t("marketingInnovationTechnologySummarySection:title"),
		durationLabel: req.t("marketingInnovationTechnologySummarySection:durationLabel"),
		durationValue: req.t("marketingInnovationTechnologySummarySection:durationValue"),
		degreeLabel: req.t("marketingInnovationTechnologySummarySection:degreeLabel"),
		degreeValue: req.t("marketingInnovationTechnologySummarySection:degreeValue"),
		accreditationLabel: req.t("marketingInnovationTechnologySummarySection:accreditationLabel"),
		accreditationValue: req.t("marketingInnovationTechnologySummarySection:accreditationValue"),
	};
};

const getMarketingInnovationTechnologyOverviewSection = async (req) => {
	await logging(req.language);

	return {
		title: req.t("marketingInnovationTechnologyOverviewSection:title"),
		content: req.t("marketingInnovationTechnologyOverviewSection:content"),
	};
};

const getMarketingInnovationTechnologyStudentActivitiesSection = async (req) => {
	await logging(req.language);

	return {
		title: req.t("marketingInnovationTechnologyStudentActivitiesSection:title"),
		content: req.t("marketingInnovationTechnologyStudentActivitiesSection:content"),
	};
};

const getMarketingInnovationTechnologyCareerImpactSection = async (req) => {
	await logging(req.language);

	return {
		title: req.t("marketingInnovationTechnologyCareerImpactSection:title"),
		content: req.t("marketingInnovationTechnologyCareerImpactSection:content"),
	};
};

const getSafetyRiskEngHeroSection = async (req) => {
	await logging(req.language);

	return {
		title: req.t("SafetyRiskEngHeroSection:title"),
	};
};

const getSafetyRiskEngGroupSection = async (req) => {
	await logging(req.language);

	return {
		overview: req.t("SafetyRiskEngGroupSection:overview"),
		studentActivities: req.t("SafetyRiskEngGroupSection:studentActivities"),
		careerImpact: req.t("SafetyRiskEngGroupSection:careerImpact"),
	};
};

const getSafetyRiskEngSummarySection = async (req) => {
	await logging(req.language);

	return {
		title: req.t("SafetyRiskEngSummarySection:title"),
		durationLabel: req.t("SafetyRiskEngSummarySection:durationLabel"),
		durationValue: req.t("SafetyRiskEngSummarySection:durationValue"),
		degreeLabel: req.t("SafetyRiskEngSummarySection:degreeLabel"),
		degreeValue: req.t("SafetyRiskEngSummarySection:degreeValue"),
		accreditationLabel: req.t("SafetyRiskEngSummarySection:accreditationLabel"),
		accreditationValue: req.t("SafetyRiskEngSummarySection:accreditationValue"),
	};
};

const getSafetyRiskEngOverviewSection = async (req) => {
	await logging(req.language);

	return {
		title: req.t("SafetyRiskEngOverviewSection:title"),
		content: req.t("SafetyRiskEngOverviewSection:content"),
	};
};

const getSafetyRiskEngStudentActivitiesSection = async (req) => {
	await logging(req.language);

	return {
		title: req.t("SafetyRiskEngStudentActivitiesSection:title"),
		content: req.t("SafetyRiskEngStudentActivitiesSection:content"),
	};
};

const getSafetyRiskEngCareerImpactSection = async (req) => {
	await logging(req.language);

	return {
		title: req.t("SafetyRiskEngCareerImpactSection:title"),
		content: req.t("SafetyRiskEngCareerImpactSection:content"),
	};
};

const getAcademicsHeroSection = async (req, filename) => {
	await logging(req.language);

	return {
		title: req.t(`${filename}:title`),
	};
};

const getAcademicsGroupSection = async (req, filename) => {
	await logging(req.language);

	return {
		overview: req.t(`${filename}:overview`),
		studentActivities: req.t(`${filename}:studentActivities`),
		careerImpact: req.t(`${filename}:careerImpact`),
	};
};

const getAcademicsSummarySection = async (req, filename) => {
	await logging(req.language);

	return {
		title: req.t(`${filename}:title`),
		durationLabel: req.t(`${filename}:durationLabel`),
		durationValue: req.t(`${filename}:durationValue`),
		degreeLabel: req.t(`${filename}:degreeLabel`),
		degreeValue: req.t(`${filename}:degreeValue`),
		accreditationLabel: req.t(`${filename}:accreditationLabel`),
		accreditationValue: req.t(`${filename}:accreditationValue`),
	};
};

const getAcademicsOverviewSection = async (req, filename) => {
	await logging(req.language);

	return {
		title: req.t(`${filename}:title`),
		content: req.t(`${filename}:content`),
	};
};

const getAcademicsStudentActivitiesSection = async (req, filename) => {
	await logging(req.language);

	return {
		title: req.t(`${filename}:title`),
		content: req.t(`${filename}:content`),
	};
};

const getAcademicsCareerImpactSection = async (req, filename) => {
	await logging(req.language);

	return {
		title: req.t(`${filename}:title`),
		content: req.t(`${filename}:content`),
	};
};

const getDutiesHero = async (req) => {
	await logging(req.language);

	return {
		duties: req.t("dutiesHero:duties"),
		dutiesFunctions: req.t("dutiesHero:dutiesFunctions"),
	};
};

const getOurLeadersHero = async (req) => {
	await logging(req.language);

	return {
		ourLeadersHero: req.t("ourLeadersHero:ourLeaders"),
	};
};

const getOrganizationalStructure = async (req) => {
	await logging(req.language);

	return {
		orgStructure: req.t("organizationalStructure:orgStructure"),
	};
};

const getOurPurposeHero = async (req) => {
	await logging(req.language);

	return {
		ourPurpose: req.t("ourPurposeHero:ourPurpose"),
		visionMission: req.t("ourPurposeHero:visionMission"),
	};
};

function findByUrl(menuList, targetUrl) {
	for (const menu of menuList) {
		// Check if the current menu item has the target URL
		if (menu.url === targetUrl) {
			return menu;
		}
		// Recursively search in submenus if they exist
		if (menu.submenus && menu.submenus.length > 0) {
			const found = findByUrl(menu.submenus, targetUrl);
			if (found) return found; // Return the found item from submenus
		}
	}
	return null; // Return null if no match is found
}

const getContactInfo = async () => {
	try {
		const contactInfo = await ContactInfoService.findAll();
		if (contactInfo) {
			return groupByChannel(contactInfo);
		}
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

const getCompanyInfo = async () => {
	try {
		return await CompanyProfileService.findOne();
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

function organizeMenu(menuItems, language) {
	const langSuffix = `_${language.toLowerCase()}`;

	// Create a map to store menu items by id for quick lookup
	const menuMap = {};

	// Initialize each menu item and filter labels based on the selected language
	menuItems.forEach((item) => {
		// Only include the fields that match the specified language
		const filteredItem = {
			id: item.id,
			url: item.url,
			parent_id: item.parent_id,
			order: item.order,
			label: item[`label${langSuffix}`], // Dynamically select the label for the specified language
			submenus: [],
		};
		menuMap[item.id] = filteredItem;
	});

	// Create the nested menu structure
	const menuTree = [];
	menuItems.forEach((item) => {
		if (item.parent_id) {
			// If the item has a parent, add it as a child of the parent in the map
			menuMap[item.parent_id].submenus.push(menuMap[item.id]);
		} else {
			// If no parent_id, it's a top-level menu item
			menuTree.push(menuMap[item.id]);
		}
	});

	return menuTree;
}

function groupByChannel(items) {
	return items.reduce((acc, item) => {
		// Initialize array if the channel does not exist in the accumulator
		if (!acc[item.channel]) {
			acc[item.channel] = [];
		}
		// Add the item to the respective channel array
		acc[item.channel].push(item);
		return acc;
	}, {});
}

function groupByType(items, adjustItem) {
	return items.reduce((acc, item) => {
		// Assign the item directly to its type key

		if (adjustItem) {
			adjustItem(item);
		}
		acc[item.type] = item;

		return acc;
	}, {});
}

module.exports = {
	getCommonComponent,
	getFooter,
	getWebMenu,
	getContactInfo,
	getCompanyInfo,
	groupByType,
	getAlumniSection,
	getLecturerSection,
	findByUrl,
	getLatestNewsSection,
	getHomeHero,
	getHistoryHero,
	getComplaints,
	getDutiesHero,
	getOurPurposeHero,
	getOrganizationalStructure,
	getOurLeadersHero,
	getTrainingSection,
	getPublicComment,
	getAlumni,
	getMarketingInnovationTechnologyHeroSection,
	getMarketingInnovationTechnologyGroupSection,
	getMarketingInnovationTechnologySummarySection,
	getMarketingInnovationTechnologyOverviewSection,
	getMarketingInnovationTechnologyStudentActivitiesSection,
	getMarketingInnovationTechnologyCareerImpactSection,
	getSafetyRiskEngHeroSection,
	getSafetyRiskEngGroupSection,
	getSafetyRiskEngSummarySection,
	getSafetyRiskEngOverviewSection,
	getSafetyRiskEngStudentActivitiesSection,
	getSafetyRiskEngCareerImpactSection,
	getAcademicsHeroSection,
	getAcademicsGroupSection,
	getAcademicsSummarySection,
	getAcademicsOverviewSection,
	getAcademicsStudentActivitiesSection,
	getAcademicsCareerImpactSection,
};
