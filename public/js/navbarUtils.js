function handleIcon_onClicked() {
	const navbarMobile = document.getElementById("navbar-mobile");
	navbarMobile.classList.toggle("show");
}

function toggleNavBarMobileMenu(event) {
	const targetList = event.target.nextElementSibling;
	if (targetList != null && targetList.classList.contains("showDropdown")) {
		targetList.classList.remove("showDropdown");
		targetList.classList.add("hideDropdown");
	} else if (targetList != null && targetList.classList.contains("hideDropdown")) {
		targetList.classList.remove("hideDropdown");
		targetList.classList.add("showDropdown");
	}
}

function outsideClickListener(event) {
	const container = document.querySelector(".navbar-mobile__language ul");
	const button = document.querySelector("#translation-icon__mobile");
	if (!container.contains(event.target) && !button.contains(event.target)) {
		container.style.display = "none";
		document.removeEventListener("click", outsideClickListener);
	}
}

function toggleMobileLanguage() {
	const navbarMobile = document.getElementById("navbar-mobile");
	navbarMobile.classList.remove("show");

	const targetList = translationIconMobile.nextElementSibling;

	if (targetList.style.display === "none" || targetList.style.display === "") {
		targetList.style.display = "flex";
		document.addEventListener("click", outsideClickListener);
	} else {
		targetList.style.display = "none";
		document.removeEventListener("click", outsideClickListener);
	}
}

const listNavbarMobile = document.getElementById("list-navbar__mobile");
listNavbarMobile.addEventListener("mouseup", handleIcon_onClicked);

const translationIconMobile = document.getElementById("translation-icon__mobile");
translationIconMobile.addEventListener("mouseup", toggleMobileLanguage);

const navbarMobileLabel = document.querySelectorAll(".navbar-mobile__label");
for (let n = 0; n < navbarMobileLabel.length; n++) {
	navbarMobileLabel[n].addEventListener("mouseup", toggleNavBarMobileMenu);
}