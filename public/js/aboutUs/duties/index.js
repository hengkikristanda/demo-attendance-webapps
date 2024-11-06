document.addEventListener("DOMContentLoaded", () => {
	const sectionHeader = document.querySelectorAll(".section-header h6");

	let defaultIndex = 0;

	sectionHeader.forEach((item, index) => {
		item.addEventListener("mouseup", () => {
			if (index != defaultIndex) {
				sectionHeader[defaultIndex].classList.remove("bg-tertiary/15");
				item.classList.add("bg-tertiary/15");
			}

			const targetContentContainer = document.querySelectorAll(".tabs-content");

			if (index != defaultIndex) {
				targetContentContainer[defaultIndex].classList.remove("show");
				targetContentContainer[defaultIndex].classList.add("hide");

				targetContentContainer[index].classList.remove("hide");
				targetContentContainer[index].classList.add("show");
				defaultIndex = index;
			}
		});
	});
});
