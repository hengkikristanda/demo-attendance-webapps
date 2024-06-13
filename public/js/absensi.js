async function fetchServerTime() {
	const response = await fetch("http://worldtimeapi.org/api/timezone/Etc/UTC");
	const data = await response.json();
	return new Date(data.datetime);
}

// This function sets up the real-time ticking clock
function setupClock() {
	fetchServerTime()
		.then((serverTime) => {
			console.log(serverTime);
			console.log(serverTime.getTime());
			const timeOffset = serverTime.getTime() - new Date().getTime();
			const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
			const months = [
				"Januari",
				"Februari",
				"Maret",
				"April",
				"Mei",
				"Juni",
				"Juli",
				"Agustus",
				"September",
				"Oktober",
				"November",
				"Desember",
			];

			let showColon = true;

			setInterval(() => {
				const currentTime = new Date(new Date().getTime() + timeOffset);
				let hours = currentTime.getHours();
				let minutes = currentTime.getMinutes();

				// Ensuring double digits for hours and minutes
				hours = hours < 10 ? "0" + hours : hours;
				minutes = minutes < 10 ? "0" + minutes : minutes;

				// Toggle colon visibility
				// const colon = showColon ? ':' : ':';
				// document.getElementById('clock').innerText = `${hours}${colon}${minutes}`;
				showColon = !showColon; // Toggle the boolean value

				document.getElementById("hour").textContent = `${hours}`;
				document.getElementById("colon").classList.toggle("text-white");
				document.getElementById("minute").textContent = `${minutes}`;

				const dayInBahasa = days[currentTime.getUTCDay()];
				const monthInBahasa = months[currentTime.getUTCMonth()];

				document.getElementById(
					"date"
				).innerText = `${dayInBahasa}, ${currentTime.getUTCDate()} ${monthInBahasa} ${currentTime.getUTCFullYear()}`;
			}, 1000);
		})
		.catch((error) => {
			console.error("Failed to fetch server time:", error);
			document.getElementById("clock").innerText = "Failed to load time";
		});
}

function captureLocationAndTime(actionType) {
	// Check if geolocation is supported
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;

				const clockInHour = document.getElementById("hour").innerText;
				const clockInMin = document.getElementById("minute").innerText;

				const clockDate = document.getElementById("date").innerText;

				const locationInfo = `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(
					4
				)} at ${clockInHour}:${clockInMin}`;

				const locationResult = document.getElementById("location-result");
                // locationResult.innerText = `Clocked In: ${clockDate} ${clockInHour}:${clockInMin}`;

                const clockType = actionType == "in" ? "Clocked In" : "Clocked Out";

                const p = document.createElement("p");
                p.innerHTML = `
                    <div class="flex gap-2">
                        <p class="font-semibold">${clockType}:</p>
                        <p>${clockDate} ${clockInHour}:${clockInMin}</p>
                    </div>`;

                locationResult.appendChild(p);


			},
			(error) => {
				document.getElementById(
					"location-result"
				).innerText = `Unable to capture location: ${error.message}`;
			}
		);
	} else {
		document.getElementById("location-result").innerText =
			"Geolocation is not supported by this browser.";
	}
}

const clockedInButton = document.getElementById("clockedIn");
const clockedOutButton = document.getElementById("clockedOut");

clockedInButton.addEventListener("click", () => {
	captureLocationAndTime("in");
	clockedInButton.classList.add("disabled");
    clockedInButton.disabled = true;
    clockedOutButton.classList.remove("disabled");
    clockedOutButton.disabled = false;
});

clockedOutButton.addEventListener("click", () => {
	captureLocationAndTime("out");
	clockedOutButton.classList.add("disabled");
    clockedOutButton.disabled = true;
});

// Start the clock once the page loads
setupClock();
