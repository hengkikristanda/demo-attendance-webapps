const UserService = require("../../services/UserService");
const CmsMenuService = require("../../services/CmsMenuService");
const CommonUtils = require("../../utils/CommonUtils");
const SectionsService = require("../../services/Sections/SectionsService");

const CompanyProfileService = require("../../services/CompanyProfileService");
const ContactInfoService = require("../../services/ContactInfoService");

const contactTypeId = {
	email: "79d31c02-8911-11ef-a41d-f07370d6e2ea",
	facebook: "7417b604-8911-11ef-a41d-f07370d6e2ea",
	instagram: "722922b7-8911-11ef-a41d-f07370d6e2ea",
	linkedin: "d6f3fbbf-a9a1-11ef-be9c-d5a2ad7b6072",
	telephone: "333393a9-8a37-11ef-a41d-f07370d6e2ea",
	whatsapps: "0a949c44-8a3c-11ef-a41d-f07370d6e2ea",
	youtube: "732a4615-8911-11ef-a41d-f07370d6e2ea",
};

const getOrganizationProfile = async (req, res) => {
	try {
		const mappedMenuList = await UserService.findMappedMenuByUserRoleId(req.user.userRole);
		res.locals.cmsMenuList = await CmsMenuService.groupingMenus(mappedMenuList);

		const companyProfileData = await CompanyProfileService.findOne();

		res.locals.companyProfile = CommonUtils.getImageUrl(companyProfileData, "/img");

		res.locals.contactInfoListData = await ContactInfoService.findAll();

		const alertMessage = req.flash("alertMessage");

		return res.render("memberArea/settings/organizationProfile", {
			title: "PTDI STTD - Organization Profile",
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

const putOrganizationUpdate = async (req, res) => {
	try {
		const id = req.params.id;

		const existingProfile = await CompanyProfileService.findById(id);
		if (!existingProfile) {
			throw new Error("No company profile found for the provided id: " + id);
		}

		const { organizationName, organizationShortName, organizationAddress, contactInfo } = req.body;

		const newContactDataList = [];

		if (contactInfo) {
			if (Array.isArray(contactInfo)) {
				for (contact of contactInfo) {
					const contactData = contact.split(";");

					newContactDataList.push({
						label: contactData[1],
						value: contactData[2],
						contact_type_id: contactTypeId[contactData[0]],
						pinned: contactData[3] === "true" ? 1 : 0,
					});
				}
			} else {
				const contactData = contactInfo.split(";");

				newContactDataList.push({
					label: contactData[1],
					value: contactData[2],
					contact_type_id: contactTypeId[contactData[0]],
					pinned: contactData[3] === "true" ? 1 : 0,
				});
			}
		}

		const createdData = await ContactInfoService.bulkCreate(newContactDataList);
		if (!createdData) throw new Error();

		// const sanitizeContent = CommonUtils.sanitizeContent(organizationAddress);

		// existingProfile.official_name = organizationName;
		// existingProfile.short_name = organizationShortName;
		// existingProfile.address = sanitizeContent;

		// const updatedProfile = await CompanyProfileService.update(existingProfile, req.file);

		// if (!updatedProfile) throw new Error();

		/* 

		

		existingSection.heading = sectionHeading;
		existingSection.action_link_label = buttonLabel1;
		existingSection.action_link_href = buttonLabel1Link;
		existingSection.option_link_label = buttonLabel2;
		existingSection.option_link_href = buttonLabel2Link;
		existingSection.content = sanitizeContent;
		existingSection.template_id = templateId;

		const updatedSection = await SectionsService.updateSection(existingSection, req.file);

		if (!updatedSection) throw new Error(); */

		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Successfully Update profile",
			className: "success",
		});
	} catch (error) {
		console.log(error);
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Failed to update, please try again in a few minutes.",
			className: "danger",
		});
	}
	return res.redirect("/member/settings/organization-profile");
};

module.exports = {
	getOrganizationProfile,
	putOrganizationUpdate,
};
