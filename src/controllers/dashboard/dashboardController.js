const UserService = require("../../services/UserService");
const CmsMenuService = require("../../services/CmsMenuService");

const getDashboard = async (req, res) => {
	try {
		const mappedMenuList = await UserService.findMappedMenuByUserRoleId(req.user.userRole);
		res.locals.cmsMenuList = await CmsMenuService.groupingMenus(mappedMenuList);

		return res.render("memberArea/dashboard/home/index", {
			title: "PTDI STTD - Dashboard",
		});
	} catch (error) {
		console.log(error);
	}
};

const getHome = async (req, res) => {
	res.render("memberArea/dashboard/inbox/index", {
		title: "PTDI STTD - Inbox",
	});
};

module.exports = {
	getDashboard,
	getHome,
};
