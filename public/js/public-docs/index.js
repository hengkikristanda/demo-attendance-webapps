document.addEventListener("DOMContentLoaded", () => {
	handleSideBar();
	handleFilterTable("publicDocsTable");

	const subscriberDataTable = document.querySelectorAll("#publicDocsTable th");
	subscriberDataTable.forEach((item, index) => {
		item.addEventListener("mouseup", () => sortTable(index, "publicDocsTable"));
	});

	function hideTableActionMenu() {
		document.querySelectorAll(".rows-action-menu").forEach((menu) => {
			menu.classList.add("hidden");
		});
	}

	const menuButtons = document.querySelectorAll(".menu-button");

	menuButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const menu = this.nextElementSibling;
			if (menu.classList.contains("hidden")) {
				hideTableActionMenu();
				menu.classList.remove("hidden");
			} else {
				menu.classList.add("hidden");
			}
		});
	});

	
});
