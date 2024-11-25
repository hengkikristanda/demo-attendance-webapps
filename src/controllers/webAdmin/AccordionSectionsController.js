const UserService = require("../../services/UserService");
const CmsMenuService = require("../../services/CmsMenuService");
const CommonUtils = require("../../utils/CommonUtils");
const SectionsService = require("../../services/Sections/SectionsService");
const AccordionContentService = require("../../services/AccordionContentService");

const templateId = "AccordionSection";

const getSections = async (req, res) => {
	try {
		const mappedMenuList = await UserService.findMappedMenuByUserRoleId(req.user.userRole);
		res.locals.cmsMenuList = await CmsMenuService.groupingMenus(mappedMenuList);

		res.locals.sectionList = await SectionsService.findByTemplateId(templateId);

		const alertMessage = req.flash("alertMessage");

		return res.render("memberArea/components/accordionSections/list", {
			title: "PTDI STTD - Accordion Sections",
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

const getSectionsAdd = async (req, res) => {
	try {
		const mappedMenuList = await UserService.findMappedMenuByUserRoleId(req.user.userRole);
		res.locals.cmsMenuList = await CmsMenuService.groupingMenus(mappedMenuList);

		res.locals.existingSectionData = {};

		const alertMessage = req.flash("alertMessage");

		return res.render("memberArea/components/accordionSections/add", {
			title: "PTDI STTD - Add New Section",
			alertMessage: alertMessage[0],
		});
	} catch (error) {
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Something went wrong, please try again in a few minutes.",
			className: "danger",
			actionLink: "/member/components/accordionSections",
			actionLinkLabel: "Back to Previous Page",
		});
		return res.redirect("/error");
	}
};

const postSectionsAdd = async (req, res) => {
	try {
		const { sectionHeading, sectionContent, accordionSectionList } = req.body;

		const sanitizeContent = CommonUtils.sanitizeContent(sectionContent);

		const accordionSection = JSON.parse(accordionSectionList);

		const createdSection = await SectionsService.createSection(
			{
				heading: sectionHeading,
				content: sanitizeContent,
				template_id: templateId,
			},
			null,
			accordionSection
		);

		if (!createdSection) throw new Error();

		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Successfully Create Section",
			className: "success",
		});
	} catch (error) {
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Failed to create Section, please try again in a few minutes.",
			className: "danger",
		});
	}
	return res.redirect("/member/components/section-accordion");
};

const deleteSection = async (req, res) => {
	try {
		const sectionId = req.params.sectionId;

		const deletedSection = await SectionsService.deleteSection(sectionId);
		if (!deletedSection) throw new Error();

		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Successfully delete Section",
			className: "success",
		});
	} catch (error) {
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Failed to delete Section, please try again in a few minutes.",
			className: "danger",
		});
	}
	return res.redirect("/member/components/section-accordion");
};

const getSectionsUpdate = async (req, res) => {
	try {
		const sectionId = req.params.sectionId;

		const alertMessage = req.flash("alertMessage");

		const existingSection = await SectionsService.findById(sectionId);
		if (!existingSection) {
			req.flash("alertMessage");
			req.flash("alertMessage", {
				message: "Something went wrong, please try again in a few minutes.",
				className: "danger",
			});
			return res.redirect("/member/components/section-accordion");
		}

		res.locals.existingSectionData = CommonUtils.getImageUrl(existingSection, "/img/sections");

		const mappedMenuList = await UserService.findMappedMenuByUserRoleId(req.user.userRole);
		res.locals.cmsMenuList = await CmsMenuService.groupingMenus(mappedMenuList);

		// res.locals.sectionList = await SectionsService.findByTemplateId("AccordionSection");

		const accordionSectionListData = await AccordionContentService.findBySectionId(sectionId);
		res.locals.accordionSectionListData = accordionSectionListData;

		return res.render("memberArea/components/accordionSections/update", {
			title: "PTDI STTD - Accordion Section",
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

const putSectionsUpdate = async (req, res) => {
	try {
		const sectionId = req.params.sectionId;

		const existingSection = await SectionsService.findById(sectionId, false);
		if (!existingSection) {
			throw new Error("No Section found for the provided sectionId: " + sectionId);
		}

		const { sectionHeading, sectionContent, accordionSectionList } = req.body;

		const sanitizeContent = CommonUtils.sanitizeContent(sectionContent);

		const accordionSection = JSON.parse(accordionSectionList);

		existingSection.heading = sectionHeading;
		existingSection.content = sanitizeContent;
		existingSection.template_id = templateId;

		const updatedSection = await SectionsService.updateSection(existingSection, null, accordionSection);

		if (!updatedSection) throw new Error();

		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Successfully Update Section",
			className: "success",
		});
	} catch (error) {
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Failed to update Section, please try again in a few minutes.",
			className: "danger",
		});
	}
	return res.redirect("/member/components/section-accordion");
};

module.exports = {
	getSections,
	getSectionsUpdate,
	getSectionsAdd,
	postSectionsAdd,
	deleteSection,
	putSectionsUpdate,
};
