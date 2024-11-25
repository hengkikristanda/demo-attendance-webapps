const UserService = require("../../services/UserService");
const CmsMenuService = require("../../services/CmsMenuService");
const CommonUtils = require("../../utils/CommonUtils");
const SectionsService = require("../../services/Sections/SectionsService");

const templateId = "SimpleBasic";

const getSections = async (req, res) => {
	try {
		const mappedMenuList = await UserService.findMappedMenuByUserRoleId(req.user.userRole);
		res.locals.cmsMenuList = await CmsMenuService.groupingMenus(mappedMenuList);

		res.locals.sectionList = await SectionsService.findByTemplateId("SimpleBasic");

		const alertMessage = req.flash("alertMessage");

		return res.render("memberArea/components/sections/list", {
			title: "PTDI STTD - Sections",
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

		return res.render("memberArea/components/sections/add", {
			title: "PTDI STTD - Add New Section",
			alertMessage: alertMessage[0],
		});
	} catch (error) {
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Something went wrong, please try again in a few minutes.",
			className: "danger",
			actionLink: "/member/components/section",
			actionLinkLabel: "Back to Previous Page",
		});
		return res.redirect("/error");
	}
};

const postSectionsAdd = async (req, res) => {
	try {
		const { sectionHeading, sectionSubHeading, sectionContent } = req.body;

		const sanitizeContent = CommonUtils.sanitizeContent(sectionContent);

		const createdSection = await SectionsService.createSection(
			{
				heading: sectionHeading,
				subheading: sectionSubHeading,
				content: sanitizeContent,
				template_id: templateId,
			},
			req.file
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
	return res.redirect("/member/components/section");
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
	return res.redirect("/member/components/section");
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
			return res.redirect("/member/components/section");
		}

		res.locals.existingSectionData = CommonUtils.getImageUrl(existingSection, "/img/sections");

		const mappedMenuList = await UserService.findMappedMenuByUserRoleId(req.user.userRole);
		res.locals.cmsMenuList = await CmsMenuService.groupingMenus(mappedMenuList);

		res.locals.sectionList = await SectionsService.findByTemplateId("SimpleBasic");

		return res.render("memberArea/components/sections/update", {
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
		const { sectionHeading, sectionSubHeading, sectionContent } = req.body;

		const sectionId = req.params.sectionId;

		const existingSection = await SectionsService.findById(sectionId, false);
		if (!existingSection) {
			throw new Error("No Section found for the provided sectionId: " + sectionId);
		}

		const sanitizeContent = CommonUtils.sanitizeContent(sectionContent);

		existingSection.heading = sectionHeading;
		existingSection.subheading = sectionSubHeading;
		existingSection.content = sanitizeContent;
		existingSection.template_id = templateId;

		const updatedSection = await SectionsService.updateSection(existingSection, req.file);

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
	return res.redirect("/member/components/section");
};

module.exports = {
	getSections,
	getSectionsUpdate,
	getSectionsAdd,
	postSectionsAdd,
	deleteSection,
	putSectionsUpdate,
};
