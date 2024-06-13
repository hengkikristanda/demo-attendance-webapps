document.addEventListener("DOMContentLoaded", () => {
	handleSideBar();
	handleCanvasAttachImage();

	const alertModal = document.getElementById("alertModal");

	const alertTitle = alertModal.getElementsByTagName("h3");
	const alertMessage = alertModal.getElementsByTagName("p");
	alertTitle[0].textContent = "Are you sure you want to discard changes?";
	alertMessage[1].textContent = "This action cannot be undone.";
	const loadingModal = document.getElementById("loadingModal");

	const buttonModal = alertModal.querySelectorAll("#modalButtonContainer button");
	buttonModal[0].innerHTML = "No, Stay at this page";
	buttonModal[1].innerHTML = "Yes, Discard Changes!";
	buttonModal[1].addEventListener("mouseup", () => {
		document.getElementById("overlay").style.display = "block";
		loadingModal.showModal();
		window.location.href = "/hero-pages";
	});

	const discardChangesButton = document.getElementById("discardChangesButton");
	discardChangesButton.addEventListener("mouseup", () => {
		alertModal.showModal();
	});

	const inputGroup = [
		{
			id: "fileInput",
			label: "Hero Image",
		},
	];

	const onSuccess_submitForm = () => {
		document.getElementById("createHeroImageForm").submit();
	};

	handleButtonState_onClick_customValidation("saveAsDraftButton", inputGroup, onSuccess_submitForm);
});
