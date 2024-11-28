const grouping = {
	// dashboard: {
	// 	label: "Dashboard",
	// 	listMenu: ["Home", "Inbox"],
	// },
	employee: {
		label: "Employee",
		// listMenu: ["Live Attendance", "Attendance Log", "Attendance Report"],
		listMenu: ["Live Attendance", "Attendance Report"],
	},
	webAdmin: {
		label: "Web Admin",
		listMenu: ["Alumni", "Lecturer", "News", "Facilities"],
	},
	webComponent: {
		label: "Components",
		listMenu: ["Simple Section", "Sections", "Section CTA", "Accordion", "Gallery"],
	},
	settings: {
		label: "Settings",
		listMenu: ["Organization Profile", "User Profile"],
	},
};

async function groupingMenus(data) {
	const result = [];

	// Iterate over each grouping key
	for (const [groupKey, groupValue] of Object.entries(grouping)) {
		// Find matching items from the data
		const matchedItems = data.filter((item) => groupValue.listMenu.includes(item.menu));

		// Create the grouped object
		result.push({
			group: groupValue.label,
			menus: matchedItems.map((item) => ({
				id: item.id,
				user_role: item.user_role,
				cms_menu_id: item.cms_menu_id,
				menu: item.menu,
				menu_url: item.menu_url,
				menu_icon: item.icon,
			})),
		});
	}

	return result;
}

module.exports = { groupingMenus };
