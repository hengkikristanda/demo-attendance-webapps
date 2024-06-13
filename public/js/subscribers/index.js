document.addEventListener("DOMContentLoaded", () => {
	handleSideBar();
	handleFilterTable("subscriberDataTable");

	const subscriberDataTable = document.querySelectorAll("#subscriberDataTable th");
	subscriberDataTable.forEach((item, index) => {		
		const isDateTime = index == 2;
		item.addEventListener("mouseup", () => sortTable(index, "subscriberDataTable", isDateTime));
	});
	

});
