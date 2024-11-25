const UserService = require("../../services/UserService");
const CmsMenuService = require("../../services/CmsMenuService");
const CommonUtils = require("../../utils/CommonUtils");
const SectionsService = require("../../services/Sections/SectionsService");

const SectionImagesService = require("../../services/SectionImagesService/SectionImagesService");

const templateId = "GallerySection";

const getSections = async (req, res) => {
	try {
		const mappedMenuList = await UserService.findMappedMenuByUserRoleId(req.user.userRole);
		res.locals.cmsMenuList = await CmsMenuService.groupingMenus(mappedMenuList);

		res.locals.sectionList = await SectionImagesService.findAll();

		const alertMessage = req.flash("alertMessage");

		return res.render("memberArea/components/gallerySections/list", {
			title: "PTDI STTD - Simple Sections",
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

		return res.render("memberArea/components/gallerySections/add", {
			title: "PTDI STTD - Add New Section",
			alertMessage: alertMessage[0],
		});
	} catch (error) {
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Something went wrong, please try again in a few minutes.",
			className: "danger",
			actionLink: "/member/components/gallerySections",
			actionLinkLabel: "Back to Previous Page",
		});
		return res.redirect("/error");
	}
};

const postSectionsAdd = async (req, res) => {
	try {
		const { sectionHeading } = req.body;

		const createdSection = await SectionImagesService.createSection(
			{
				title_id: sectionHeading,
			},
			req.file
		);

		if (!createdSection) throw new Error();

		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Successfully Create Gallery Section",
			className: "success",
		});
	} catch (error) {
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Failed to create Gallery Section, please try again in a few minutes.",
			className: "danger",
		});
	}
	return res.redirect("/member/components/section-gallery");
};

const deleteSection = async (req, res) => {
	try {
		const sectionId = req.params.sectionId;

		const deletedSection = await SectionImagesService.deleteSection(sectionId);
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
	return res.redirect("/member/components/section-gallery");
};

const getSectionsUpdate = async (req, res) => {
	try {
		const sectionId = req.params.sectionId;

		const alertMessage = req.flash("alertMessage");

		const existingSection = await SectionImagesService.findById(sectionId);
		if (!existingSection) {
			req.flash("alertMessage");
			req.flash("alertMessage", {
				message: "Something went wrong, please try again in a few minutes.",
				className: "danger",
			});
			return res.redirect("/member/components/section-gallery");
		}

		res.locals.existingSectionData = existingSection; //CommonUtils.getImageUrl(existingSection, "/img/sections");

		const imageList = await SectionImagesService.findMappingBySectionImagesId(existingSection.id);

		res.locals.imageListData = imageList.map((imageData) =>
			CommonUtils.getImageUrl(imageData, "/img/sections")
		);

		const mappedMenuList = await UserService.findMappedMenuByUserRoleId(req.user.userRole);
		res.locals.cmsMenuList = await CmsMenuService.groupingMenus(mappedMenuList);

		res.locals.sectionList = await SectionsService.findByTemplateId("SimpleBasic");

		return res.render("memberArea/components/gallerySections/update", {
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
		const sectionId = req.params.sectionId;

		const existingSection = await SectionImagesService.findById(sectionId, false);
		if (!existingSection) {
			throw new Error("No Section Image found for the provided sectionId: " + sectionId);
		}

		const { sectionHeading, removedImageId } = req.body;

		const createdSection = await SectionImagesService.updateSection(
			existingSection,
			sectionHeading,
			removedImageId,
			req.file
		);

		if (!createdSection) throw new Error();

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
	return res.redirect("/member/components/section-gallery");
};

module.exports = {
	getSections,
	getSectionsUpdate,
	getSectionsAdd,
	postSectionsAdd,
	deleteSection,
	putSectionsUpdate,
};
