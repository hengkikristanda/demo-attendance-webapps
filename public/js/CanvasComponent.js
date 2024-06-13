// 1.
function handleCanvasAttachImage() {
	const attachedImage = document.getElementById("attachedImage");
	const fileInput = document.getElementById("fileInput");

	attachedImage.addEventListener("click", () => {
		fileInput.click();
	});

	fileInput.addEventListener("change", handleSelectedImage);
}

// 2.
function handleSelectedImage(e) {
	const selectedFile = e.target.files[0];

	if (selectedFile) {
		const fileType = selectedFile.type;
		const validImageTypes = ["image/jpeg", "image/png", "image/gif"];

		const errorMessageBadge = document.querySelectorAll(".errorMessageBadge");
		removeBadges(errorMessageBadge);

		const badgesContainer = document.querySelector("#badgesContainer");

		if (!validImageTypes.includes(fileType)) {
			const p = document.createElement("p");
			p.classList.add("errorMessageBadge", "badge", "danger", "bi", "bi-dot");
			p.textContent = "Please select a valid image file (JPEG, PNG, GIF).";
			badgesContainer.appendChild(p);

			fileInput.value = "";
		} else {
			const reader = new FileReader();

			reader.onload = function (event) {
				const imageUrl = event.target.result;
				attachedImage.src = imageUrl;
			};

			reader.readAsDataURL(selectedFile);
		}
	}
}
