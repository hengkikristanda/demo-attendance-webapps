const UserService = require("../../services/UserService");
const CmsMenuService = require("../../services/CmsMenuService");
const HeroSectionService = require("../../services/HeroSectionService");
const FacilitiesService = require("../../services/FacilitiesService");
const CommonUtils = require("../../utils/CommonUtils");
const { TEMPLATES } = require("../../utils/Constants");

const SectionsService = require("../../services/Sections/SectionsService");
const SectionImagesService = require("../../services/SectionImagesService/SectionImagesService");

const heroSectionId = "c1af0b5d-a194-11ef-be9c-d5a2ad7b6072";

const getFacilities = async (req, res) => {
	try {
		const mappedMenuList = await UserService.findMappedMenuByUserRoleId(req.user.userRole);
		res.locals.cmsMenuList = await CmsMenuService.groupingMenus(mappedMenuList);

		const heroSectionData = await HeroSectionService.findById(heroSectionId);

		res.locals.heroSectionData = CommonUtils.getImageUrl(heroSectionData, "/img/sections");

		res.locals.templateList = TEMPLATES;

		const sectionList = await SectionsService.findAll();

		const groupedByTemplate = sectionList.reduce((acc, item) => {
			// Check if the item's template_id exists in TEMPLATES
			const template = TEMPLATES.find((t) => t.id === item.template_id);
			if (template) {
				// If template_id exists, group the item under the corresponding id
				if (!acc[template.id]) {
					acc[template.id] = [];
				}
				acc[template.id].push({
					id: item.id,
					heading: item.heading,
					template_id: item.template_id,
				});
			}
			return acc;
		}, {});

		const sectionImageList = await SectionImagesService.findAll();

		groupedByTemplate.GallerySection = sectionImageList.map(({ id, title_id }) => ({
			id,
			heading: title_id,
			template_id: "GallerySection",
		}));

		res.locals.templateGroups = groupedByTemplate;

		const alertMessage = req.flash("alertMessage");

		return res.render("memberArea/web/facilities/", {
			title: "PTDI STTD - Campus Facilities",
			alertMessage: alertMessage[0],
		});
	} catch (error) {
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Something went wrong, please try again in a few minutes.",
			className: "danger",
			actionLink: "/users/login",
			actionLinkLabel: "Back to login page",
		});
		return res.redirect("/error");
	}
};

const getUpdateFacilitiesHeader = async (req, res) => {
	try {
		const mappedMenuList = await UserService.findMappedMenuByUserRoleId(req.user.userRole);
		res.locals.cmsMenuList = await CmsMenuService.groupingMenus(mappedMenuList);

		const heroSectionData = await HeroSectionService.findById(heroSectionId);

		res.locals.heroSectionData = CommonUtils.getImageUrl(heroSectionData, "/img/sections");

		const alertMessage = req.flash("alertMessage");

		return res.render("memberArea/web/facilities/pageHeader", {
			title: "PTDI STTD - Campus Facilities",
			alertMessage: alertMessage[0],
		});
	} catch (error) {
		console.log(error);
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Something went wrong, please try again in a few minutes.",
			className: "danger",
			actionLink: "/users/login",
			actionLinkLabel: "Back to login page",
		});
		return res.redirect("/error");
	}
};

const putUpdateFacilitiesHeader = async (req, res) => {
	try {
		// Get form data
		const { pageHeaderTitle, pageSubHeaderTitle } = req.body;

		const existingHeroSection = await HeroSectionService.findById(heroSectionId, false);
		if (!existingHeroSection) {
			throw new Error("Unable to find Existing Hero Section");
		}

		existingHeroSection.title = pageHeaderTitle;
		existingHeroSection.subtitle = pageSubHeaderTitle;

		await HeroSectionService.updateHeroSection(existingHeroSection, req.file);

		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Successfully updated",
			className: "success",
		});
	} catch (error) {
		console.error("Error Updating Facilities Hero Section:", error);
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Failed to update header, please try again in a few minutes.",
			className: "danger",
		});
		return res.redirect("/member/web/facilities");
	}
	return res.redirect("/member/web/facilities");
};

const putUpdateFacilitiesSection = async (req, res) => {
	try {
		// Get form data
		const { facilityName, facilityDescription } = req.body;
		console.log("facilityName: " + facilityName);
		console.log("facilityDescription: " + facilityDescription);

		await FacilitiesService.createFacilities({
			name: facilityName,
			description: facilityDescription,
		});

		// const existingHeroSection = await HeroSectionService.findById(heroSectionId, false);
		// if (!existingHeroSection) {
		// 	throw new Error("Unable to find Existing Hero Section");
		// }

		// existingHeroSection.title = pageHeaderTitle;
		// existingHeroSection.subtitle = pageSubHeaderTitle;

		// await HeroSectionService.updateHeroSection(existingHeroSection, req.file);

		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Successfully updated",
			className: "success",
		});
	} catch (error) {
		console.error("Error Updating Facilities Hero Section:", error);
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Failed to update header, please try again in a few minutes.",
			className: "danger",
		});
		return res.redirect("/member/web/facilities");
	}
	return res.redirect("/member/web/facilities");
};

module.exports = {
	getFacilities,
	getUpdateFacilitiesHeader,
	putUpdateFacilitiesHeader,
	putUpdateFacilitiesSection,
};
