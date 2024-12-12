const UserService = require("../../services/UserService");
const CmsMenuService = require("../../services/CmsMenuService");
const CommonUtils = require("../../utils/CommonUtils");
const SectionsService = require("../../services/Sections/SectionsService");

const templateId = "SimpleSection";

const getSections = async (req, res) => {
	try {
		const mappedMenuList = await UserService.findMappedMenuByUserRoleId(req.user.userRole);
		res.locals.cmsMenuList = await CmsMenuService.groupingMenus(mappedMenuList);

		res.locals.sectionList = await SectionsService.findByTemplateId(templateId);

		const alertMessage = req.flash("alertMessage");

		return res.render("memberArea/components/circleImageSections/list", {
			title: "PTDI STTD - Circle Image Sections",
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

		return res.render("memberArea/components/circleImageSections/add", {
			title: "PTDI STTD - Add New Section",
			alertMessage: alertMessage[0],
		});
	} catch (error) {
		console.log(error);
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Unable to Add New Section, please try again in a few minutes.",
			className: "danger",
		});
		return res.redirect("/member/components/section-circle-image");
	}
};

const postSectionsAdd = async (req, res) => {
	try {
		const { sectionName } = req.body;

		console.log("====");
		console.log(req.file);

		throw new Error();

		const sanitizeContent = CommonUtils.sanitizeContent(sectionContent);

		const createdSection = await SectionsService.createSection(
			{
				heading: sectionHeading,
				content: sanitizeContent,
				template_id: templateId,
			},
			req.file
		);

		if (!createdSection) throw new Error();

		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Successfully Create Simple Section",
			className: "success",
		});
	} catch (error) {
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Failed to create Simple Section, please try again in a few minutes.",
			className: "danger",
		});
	}
	return res.redirect("/member/components/section-circle-image");
};

const deleteSection = async (req, res) => {
	try {
		const sectionId = req.params.sectionId;

		const deletedSection = await SectionsService.deleteSection(sectionId);
		if (!deletedSection) throw new Error();

		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Successfully delete Simple Section",
			className: "success",
		});
	} catch (error) {
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Failed to delete Simple Section, please try again in a few minutes.",
			className: "danger",
		});
	}
	return res.redirect("/member/components/section-simple");
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
			return res.redirect("/member/components/section-simple");
		}

		res.locals.existingSectionData = CommonUtils.getImageUrl(existingSection, "/img/sections");

		const mappedMenuList = await UserService.findMappedMenuByUserRoleId(req.user.userRole);
		res.locals.cmsMenuList = await CmsMenuService.groupingMenus(mappedMenuList);

		res.locals.sectionList = await SectionsService.findByTemplateId("SimpleBasic");

		return res.render("memberArea/components/simpleSections/update", {
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

const putSectionsUpdate = async (req, res) => {
	try {
		const { sectionHeading, sectionContent } = req.body;

		const sectionId = req.params.sectionId;

		const existingSection = await SectionsService.findById(sectionId, false);
		if (!existingSection) {
			throw new Error("No Section found for the provided sectionId: " + sectionId);
		}

		const sanitizeContent = CommonUtils.sanitizeContent(sectionContent);

		existingSection.heading = sectionHeading;
		existingSection.content = sanitizeContent;
		existingSection.template_id = templateId;

		const updatedSection = await SectionsService.updateSection(existingSection, req.file);

		if (!updatedSection) throw new Error();

		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Successfully Update Simple Section",
			className: "success",
		});
	} catch (error) {
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Failed to update Simple Section, please try again in a few minutes.",
			className: "danger",
		});
	}
	return res.redirect("/member/components/section-simple");
};

module.exports = {
	getSections,
	getSectionsUpdate,
	getSectionsAdd,
	postSectionsAdd,
	deleteSection,
	putSectionsUpdate,
};
