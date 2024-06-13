const SIDEBAR_MENU = [
	{
		groupMenu: "Home",
		item: [
			{
				id: "homeDashboard",
				label: "Dashboard",
				href: "/dashboard",
				bsClass: "bi-file-earmark-bar-graph-fill",
			},
			{
				id: "profile",
				label: "Profile Saya",
				href: "/dashboard",
				bsClass: "bi-person-lines-fill",
			},
			{
				id: "profile",
				label: "Daftar Kehadiran",
				href: "/dashboard",
				bsClass: "bi-clipboard2-check-fill",
			},
			// {
			// 	id: "homeHeroPages",
			// 	label: "Hero Pages",
			// 	href: "/hero-pages",
			// 	bsClass: "bi-image",
			// },
		],
	},
	{
		groupMenu: "Applications",
		item: [
			{
				id: "applicationsAbsensi",
				label: "Absensi",
				href: "/absensi",
				bsClass: "bi-stopwatch-fill",
			},
			{
				id: "contentNews",
				label: "Tinjauan Kinerja",
				href: "/news",
				bsClass: "bi-bar-chart-line-fill",
			},
			{
				id: "contentDocuments",
				label: "Cuti",
				href: "/public-docs",
				bsClass: "bi-building-fill-slash",
			},
		],
	},
	// {
	// 	groupMenu: "Clients",
	// 	item: [
	// 		{
	// 			id: "clientsSubscribers",
	// 			label: "Subscribers",
	// 			href: "/subscribers",
	// 			bsClass: "bi-people-fill",
	// 		},
	// 	],
	// },
	// {
	// 	groupMenu: "Web Pages",
	// 	item: [
	// 		{
	// 			id: "webPagesFooter",
	// 			label: "Footer",
	// 			href: "#",
	// 			bsClass: "bi-c-circle-fill",
	// 		},
	// 	],
	// },
	{
		groupMenu: "Download Absensi Mobile",
		item: [
			{
				id: "settingsWebSettings",
				label: "App Store",
				href: "/web-settings",
				bsClass: "bi-apple",
			},
			{
				id: "settingsAccountSettings",
				label: "Google Play",
				href: "/account-settings",
				bsClass: "bi-google-play",
			},
		],
	},
];

const getSideBarMenu = () => {
	return SIDEBAR_MENU;
};

module.exports = { getSideBarMenu };
