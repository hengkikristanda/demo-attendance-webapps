const WebPageService = require("../services/WebPageService");
const HeroSectionService = require("../services/HeroSectionService");
const AccordionContentService = require("../services/AccordionContentService");

const CommonComponentServices = require("../services/CommonsComponentServices");
const CommonUtils = require("../utils/CommonUtils");
const SectionContentService = require("../services/SectionContent/SectionContentService");
const SectionImagesService = require("../services/SectionImagesService/SectionImagesService");
const TabListItemService = require("../services/TabList/TabListItemService");
const { WEB_PAGE_TITLE } = require("../utils/Constants");

const WebPageSectionMappingService = require("../services/WebPageSectionMappingService");

const webPageId = "7e4a4013-a63b-11ef-be9c-d5a2ad7b6072";
const currentPage = {
	id: "Tugas & Fungsi",
	en: "Duties & Functions",
	ja: "任務と機能",
	ko: "임무 및 기능",
	zh: "职责与功能",
};

const getFacilities = async (req, res) => {
	try {
		const selectedLanguage = req.language;

		const heroSectionList = [];
		const imagesSectionList = [];

		const sectionList = await WebPageSectionMappingService.findByWebPageId(webPageId);

		for (sectionItem of sectionList) {
			if (sectionItem.hero_section_id !== "" && sectionItem.hero_section_id !== null) {
				let heroSection = await HeroSectionService.findById(sectionItem.hero_section_id);
				if (heroSection) {
					heroSection = await CommonUtils.getImageUrl(heroSection, "/img/sections");
					heroSectionList.push(heroSection);
				}
			} else if (sectionItem.section_images_id !== "" && sectionItem.section_images_id !== null) {
				let imagesSection = await SectionImagesService.findById(sectionItem.section_images_id);
				if (imagesSection) {
					imagesSection = await CommonUtils.getImageUrl(imagesSection, "/img/sections");
					imagesSectionList.push(imagesSection);
				}
			}
		}

		res.locals.heroSectionListData = heroSectionList;
		res.locals.imagesSectionListData = imagesSectionList;

		// const webSectionList = await WebPageService.findMappingById(
		// 	"83279412-a183-11ef-be9c-d5a2ad7b6072"
		// );

		// const groupedData = await WebPageService.groupByIdentifier(webSectionList);

		// Get Hero Section
		// const heroSectionData = await getHeroSection(groupedData.hero_section[0]);
		// res.locals.heroSectionData = heroSectionData;

		// Get Accordion Content
		// res.locals.facilitiesContentData = await getAccordionContent(groupedData.accordion_content);

		// Get Section Content
		// res.locals.facilitiesSectionData = await getSectionContent(groupedData.section_content);

		// Get Images Section/Gallery
		// const sectionImagesList = groupedData.section_images;

		// const sectionImagesData = [];

		// for (item of sectionImagesList) {
		// 	const sectionImageItem = await SectionImagesService.findById(item.section_images_id);

		// 	let imagesList = await SectionImagesService.findMappingBySectionImagesId(sectionImageItem.id);

		// 	imagesList = imagesList.map((image) => CommonUtils.getImageUrl(image, "/img/facilities"));

		// 	sectionImageItem.imageList = imagesList;

		// 	sectionImageItem.title = sectionImageItem[`title_${selectedLanguage}`];

		// 	sectionImagesData.push(sectionImageItem);
		// }
		// res.locals.sectionImagesData = sectionImagesData;

		// Common components
		const navBarMenuList = await CommonComponentServices.getWebMenu(req.language);
		res.locals.webMenuList = navBarMenuList;
		res.locals.footerTranslation = await CommonComponentServices.getFooter(req);
		res.locals.contactInfo = await CommonComponentServices.getContactInfo();
		res.locals.companyInfo = await CommonComponentServices.getCompanyInfo();

		// Render the index page
		return res.render("aboutUs/facilities/index", {
			title: `${WEB_PAGE_TITLE} ${currentPage[selectedLanguage]}`,
			selectedLanguage,
		});
	} catch (error) {
		console.log(error);
	}
	return res.redirect("/error");
};

async function getHeroSection(heroSection) {
	// Get Hero Section
	let heroSectionData = await HeroSectionService.findById(heroSection.hero_section_id);

	return await CommonUtils.getImageUrl(heroSectionData, "/img/facilities");
}

async function getAccordionContent(accordionContentList) {
	// Get Accordion Section
	const accordionContentData = [];

	// Use Promise.all to handle all async operations
	const contentPromises = accordionContentList.map(async (accordionContent) => {
		const content = await AccordionContentService.findById(accordionContent.accordion_content_id);
		return content;
	});

	// Wait for all promises to resolve and add results to accordionContentData
	accordionContentData.push(...(await Promise.all(contentPromises)));

	return accordionContentData;
}

async function getSectionContent(sectionContentList) {
	const sectionContentData = [];

	// Use Promise.all to handle all async operations
	const contentPromises = sectionContentList.map(async (sectionContent) => {
		const content = await SectionContentService.findInViewById(sectionContent.section_content_id);
		return content;
	});

	// Wait for all promises to resolve and add results to accordionContentData
	sectionContentData.push(...(await Promise.all(contentPromises)));

	return sectionContentData;
}

function createObjectByLanguage(item, languageCode) {
	// Get the title for the specified language
	const key = item[`title_${languageCode}`];

	// If the key exists, return an object with the language title as the key
	if (key) {
		return { [key]: item };
	}

	// If the title is null or undefined, return null or handle as needed
	return null;
}

module.exports = {
	getFacilities,
};
