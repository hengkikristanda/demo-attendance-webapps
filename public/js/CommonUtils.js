// 2
function LoaderSpinner() {
	const loaderComponent = document.createElement("span");
	loaderComponent.classList.add("loader");
	return loaderComponent;
}

function disabledButton_loading(buttonId) {
	const targetButton = document.getElementById(buttonId);
	targetButton.disabled = true;
	targetButton.classList.remove("success");
	targetButton.classList.add("disabled");
	const buttonLabel = targetButton.querySelector("p");
	buttonLabel.classList.add("hidden");
	targetButton.appendChild(LoaderSpinner());
}

// 1
function handleButtonState_onClick(targetFormId, buttonId) {
	const targetButton = document.getElementById(buttonId);
	if (targetButton) {
		targetButton.addEventListener("mouseup", () => {
			const targetForm = document.getElementById(targetFormId);

			if (targetForm) {
				const isFormValid = targetForm.reportValidity();
				if (isFormValid) {
					disabledButton_loading(buttonId);
					targetForm.submit();
				}
			}
		});
	}
}

// 1
function handleButtonState_onFormSubmit(targetForm, buttonId, callBack) {
	const loginForm = document.getElementById(targetForm);
	if (loginForm) {
		loginForm.addEventListener("submit", (event) => {
			event.preventDefault();
			disabledButton_loading(buttonId);
			if (callBack) {
				callBack();
			}
			loginForm.submit();
		});
	}
}

// 1
function handleButtonState_onClick_customValidation(buttonId, inputGroup, onSuccess_callBack) {
	const targetButton = document.getElementById(buttonId);

	targetButton.addEventListener("mouseup", () => {
		let isValid = true;

		const errorMessageBadge = document.querySelectorAll(".errorMessageBadge");
		removeBadges(errorMessageBadge);

		const badgesContainer = document.querySelector("#badgesContainer");

		inputGroup.forEach((input, index) => {
			const value = document.getElementById(input.id).value;
			if (value == undefined || value == "") {
				const p = document.createElement("p");
				p.classList.add("errorMessageBadge", "badge", "danger", "bi", "bi-dot");
				p.textContent = `${input.label} is required.`;
				badgesContainer.appendChild(p);
				isValid = false;
			}
		});

		if (isValid) {
			onSuccess_callBack();
		}
	});
}

function removeBadges(targetBadges) {
	targetBadges.forEach(function (badge) {
		badge.remove();
	});
}

function handleSideBar() {
	const menuButton = document.querySelector(".mobile-menu-button");
	const sidebar = document.querySelector(".sidebar");
	const overlay = document.querySelector(".overlay");

	menuButton.addEventListener("click", () => {
		sidebar.classList.toggle("-translate-x-full");
		overlay.classList.toggle("hidden");
	});

	overlay.addEventListener("click", () => {
		sidebar.classList.toggle("-translate-x-full");
		overlay.classList.add("hidden");
	});
}

function handleSideBarMenu() {
	const notificationNavBar = document.querySelector("#notificationNavBar");
	const notificationMenuNavBar = document.querySelector("#notificationMenuNavBar");

	const avatarButton = document.querySelector("#avatarNavBar");
	const menuNavBar = document.querySelector("#menuNavBar");

	avatarButton.addEventListener("mouseup", () => {
		if (menuNavBar.classList.contains("hidden")) {
			menuNavBar.classList.remove("hidden");
		} else {
			menuNavBar.classList.add("hidden");
		}
	});

	notificationNavBar.addEventListener("mouseup", () => {
		if (notificationMenuNavBar.classList.contains("hidden")) {
			notificationMenuNavBar.classList.remove("hidden");
		} else {
			notificationMenuNavBar.classList.add("hidden");
		}
	});

	window.addEventListener("click", function (e) {
		if (!e.target.matches("#avatarNavBar")) {
			menuNavBar.classList.add("hidden");
		}
		if (!e.target.matches("#notificationNavBar")) {
			notificationMenuNavBar.classList.add("hidden");
		}
	});
}

function parseCustomDate(dateString) {
	var regex = /(\w+), (\w+) (\d+), (\d+) at (\d+):(\d+):(\d+) (\w+)/;
	var [, day, month, dayNum, year, hour, minute, second, meridian] = dateString.match(regex);

	var monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Octr",
		"Nov",
		"Dec",
	];

	var monthIndex = monthNames.indexOf(month);

	if (meridian === "PM" && parseInt(hour, 10) !== 12) {
		hour = (parseInt(hour, 10) + 12).toString();
	} else if (meridian === "AM" && parseInt(hour, 10) === 12) {
		hour = "00";
	}

	return new Date(year, monthIndex, dayNum, hour, minute, second);
}

function sortDates(a, b) {
	// Convert date strings to Date objects
	const dateA = new Date(a);
	const dateB = new Date(b);

	// Compare the Date objects
	return dateA - dateB;
}

function sortTable(n, tableId, isDateTime = false) {
	var table,
		rows,
		switching,
		i,
		x,
		y,
		shouldSwitch,
		dir,
		switchcount = 0;
	table = document.getElementById(tableId);
	switching = true;
	//Set the sorting direction to ascending:
	dir = "asc";
	/*Make a loop that will continue until
	no switching has been done:*/
	while (switching) {
		//start by saying: no switching is done:
		switching = false;
		rows = table.rows;
		/*Loop through all table rows (except the
	  first, which contains table headers):*/
		for (i = 1; i < rows.length - 1; i++) {
			//start by saying there should be no switching:
			shouldSwitch = false;
			/*Get the two elements you want to compare,
		one from current row and one from the next:*/
			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];
			/*check if the two rows should switch place,
		based on the direction, asc or desc:*/
			if (!isDateTime) {
				if (dir == "asc") {
					if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
						//if so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				} else if (dir == "desc") {
					if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
						//if so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				}
			} else {
				// let dateA = parseCustomDate(x.innerHTML);
				// let dateB = parseCustomDate(y.innerHTML);

				let dateA = x.innerHTML;
				let dateB = y.innerHTML;

				if (dir == "asc") {
					if (sortDates(dateA, dateB) > 0) {
						//if so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				} else if (dir == "desc") {
					if (sortDates(dateA, dateB) < 0) {
						//if so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				}
			}
		}
		if (shouldSwitch) {
			/*If a switch has been marked, make the switch
		and mark that a switch has been done:*/
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			//Each time a switch is done, increase this count by 1:
			switchcount++;
		} else {
			/*If no switching has been done AND the direction is "asc",
		set the direction to "desc" and run the while loop again.*/
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
}

function handleFilterTable(tableId) {
	document.getElementById("filterInput").addEventListener("keyup", function () {
		let filterText = this.value.toLowerCase();
		let table = document.getElementById(tableId);
		let tbody = table.getElementsByTagName("tbody")[0];
		let rows = tbody.getElementsByTagName("tr");

		for (let row of rows) {
			let textContent = row.textContent.toLowerCase();
			row.style.display = textContent.includes(filterText) ? "" : "none";
		}
	});
}

function enforceNumberInput() {
	this.value = this.value.replace(/[^0-9]/g, "");
}

function enforceNumberInputOnCopyPaste(e) {
	e.preventDefault();
	let pastedText = (e.clipboardData || window.clipboardData).getData("text");
	this.value = pastedText.replace(/[^0-9]/g, "");
}

function enforcePhoneNumber(input) {
	// Remove any character that is not a digit
	let cleaned = ("" + input.value).replace(/\D/g, "");

	// Match the cleaned number to the pattern (XXX) XXX-XXXX
	let match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

	if (match) {
		input.value = !match[2]
			? match[1]
			: "(" + match[1] + ") " + match[2] + (match[3] ? "-" + match[3] : "");
	}
}

function validateEmailInput(input) {
	// Regular expression to validate email format
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(input);
}
