const UserService = require("../../services/UserService");
const CmsMenuService = require("../../services/CmsMenuService");
const CommonUtils = require("../../utils/CommonUtils");

const PAGE_HEADER = {
	heading: "User Profile",
	subheading: "Update User Profile",
};

const getUserProfile = async (req, res) => {
	try {
		const mappedMenuList = await UserService.findMappedMenuByUserRoleId(req.user.userRole);
		res.locals.cmsMenuList = await CmsMenuService.groupingMenus(mappedMenuList);

		const existingUser = await UserService.findById(req.user.userId, true);
		if (!existingUser) throw new Error("No user found for the provided userId: " + req.user.userId);

		existingUser.imageUrl = CommonUtils.getImageUrlPath(existingUser, `/member/assets/images`);

		res.locals.userProfile = {
			id: existingUser.id,
			userId: existingUser.username,
			fullName: existingUser.full_name,
			phoneNumber: existingUser.phone_number,
			emailAddress: existingUser.email,
			imageUrl: existingUser.imageUrl,
		};

		const alertMessage = req.flash("alertMessage");

		return res.render("memberArea/settings/userProfile", {
			title: "PTDI STTD - User Profile",
			alertMessage: alertMessage[0],
			pageHeader: PAGE_HEADER,
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

const putUserProfile = async (req, res) => {
	try {
		const id = req.params.id;

		const existingUser = await UserService.findById(id);
		if (!existingUser) {
			throw new Error("No User found for the provided id: " + id);
		}

		const { fullName, emailAddress, mobilePhoneNumber, password, confirmPassword } = req.body;

		if (password || confirmPassword) {
			if (password !== confirmPassword) {
				throw new Error("Failed to update profile! New Password and Confirm Password not match.");
			}

			if (!CommonUtils.validatePassword(password)) {
				throw new Error(
					"Password is invalid. Ensure it has at least 10 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol."
				);
			}
		}

		if (emailAddress && !CommonUtils.validateEmailInput(emailAddress)) {
			throw new Error("Invalid Email format");
		}
		existingUser.full_name = fullName;
		existingUser.phone_number = mobilePhoneNumber;
		existingUser.email = emailAddress;

		const updatedUserProfile = await UserService.updateUserProfile(existingUser, password, req.file);
		if (!updatedUserProfile) throw new Error();

		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Successfully Update profile",
			className: "success",
		});
	} catch (error) {
		console.log(error);
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: error.message,
			className: "danger",
		});
	}
	return res.redirect("/member/settings/user-profile");
};

module.exports = {
	getUserProfile,
	putUserProfile,
};
