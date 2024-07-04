import "./style.css";
import "./clock.css";
import "toastify-js/src/toastify.css"; // Import the CSS file
import Toastify from "toastify-js";
import moment from "moment-timezone";
import { clock } from "./clockComponent";
import { timeToDegreeValue } from "./time";
import { loadCities } from "./cities";

// Load cities from local storage
let cities = loadCities();

// Function to save cities to local storage
function saveCities() {
  localStorage.setItem("cities", JSON.stringify(cities));
}

saveCities();

// Function to save settings to local storage
const saveSettingsToLocalStorage = (
  startTime,
  endTime,
  timezoneValue,
  timezoneLocalString
) => {
  localStorage.setItem("startTime", startTime);
  localStorage.setItem("endTime", endTime);
  localStorage.setItem("timezoneValue", timezoneValue);
  localStorage.setItem("timezoneLocalString", timezoneLocalString);
};

// Function to fetch settings from local storage with default values
const fetchSettingsFromLocalStorage = () => ({
  startTime: localStorage.getItem("startTime") || "09:00",
  endTime: localStorage.getItem("endTime") || "17:00",
  timezoneValue: localStorage.getItem("timezoneValue") || "5.5",
  timezoneLocalString:
    localStorage.getItem("timezoneLocalString") || "Asia/Kolkata",
});

// Function to initialize time inputs and timezone from local storage
const initializeSettings = () => {
  const { startTime, endTime, timezoneValue, timezoneLocalString } =
    fetchSettingsFromLocalStorage();
  startTimeInput.value = startTime;
  endTimeInput.value = endTime;
  selectedTimezone.value = timezoneValue;

  // Set the correct option for timezone based on timezoneLocalString
  Array.from(selectedTimezone.options).forEach((option) => {
    if (
      option.getAttribute("data-timezoneLocalString") === timezoneLocalString
    ) {
      option.selected = true;
    }
  });
};

// Function to handle time input event
const handleTimeInput = () => {
  const startTime = startTimeInput.value;
  const endTime = endTimeInput.value;
  const selectedOption =
    selectedTimezone.options[selectedTimezone.selectedIndex];
  const timezoneValue = selectedOption.value;
  const timezoneLocalString = getSelectedTimeZone(
    "timezone",
    "data-timezoneLocalString"
  ); // Use getSelectedTimeZone to get timezoneLocalString

  saveSettingsToLocalStorage(
    startTime,
    endTime,
    timezoneValue,
    timezoneLocalString
  );
  convertTime(); // Call convertTime to update converted time
};

// Function to get the selected timezone's data-timezoneLocalString attribute
function getSelectedTimeZone(id, dataId) {
  const timezoneSelect = document.getElementById(id);
  const selectedOption = timezoneSelect.options[timezoneSelect.selectedIndex];
  const timeZoneLocalString = selectedOption.getAttribute(dataId);
  return timeZoneLocalString;
}

function convertTime() {
  const { startTime, endTime } = fetchSettingsFromLocalStorage();

  const myTimezone = getSelectedTimeZone(
    "timezone",
    "data-timezoneLocalString"
  );

  let cityName =
    document.getElementById("timezone").options[
      document.getElementById("timezone").selectedIndex
    ].text;

  let result = ``;
  let resultDiv = `
        <div class="resultText">
          To Trade or Work in the Cities or Markets listed below, here are your Trading or Working hours in ${cityName}, based on Your or Your Company's chosen Trading or Working hours: (${startTime} to ${endTime}). 
          These times are DST-adjusted where applicable.
          <div class="github">
            <a
              href="https://github.com/s54a/GlobalTimeConvertor"
              target="_blank"
              rel="noopener noreferrer"
              >GitHub</a
            >
          </div>
        </div>
        `;
  let resultStartTime, resultEndTime, startDeg, endDeg;

  cities.forEach((city) => {
    let cityStartTime, cityEndTime;

    if (city.isMarket) {
      cityStartTime = city.openTime;
      cityEndTime = city.closeTime;
    } else {
      cityStartTime = startTime;
      cityEndTime = endTime;
    }

    resultStartTime = convertTimeToCity(
      myTimezone,
      cityStartTime,
      city.timeZoneString
    );
    resultEndTime = convertTimeToCity(
      myTimezone,
      cityEndTime,
      city.timeZoneString
    );

    startDeg = timeToDegreeValue(resultStartTime);
    endDeg = timeToDegreeValue(resultEndTime);

    let gradient;

    if (startDeg > 243.75) {
      gradient = `background: conic-gradient(red 0deg ${endDeg}deg,#ddd ${endDeg}deg ${startDeg}deg,red ${startDeg}deg 0deg);`;
    } else {
      gradient = `background: conic-gradient(#ddd 0deg ${startDeg}deg,red ${startDeg}deg ${endDeg}deg,#ddd ${startDeg}deg ${endDeg}deg);`;
    }

    const cityNameWithoutSpaces = city.name.replace(/\s+/g, "-");

    result += `
  <div class="resultTime">
    ${clock(gradient)}
    <div class="city">${city.name}</div>
    <div class="cityTime">${resultStartTime} - ${resultEndTime}</div>
    <div class="currentCityTime city" id="current-time-${city.name.replace(
      /\s+/g,
      "-"
    )}">${getCurrentTime(city.timeZoneString)}</div>
    <div class="city timeZoneString">${city.timeZoneString} UTC ${
      city.offset
    }</div>
    <button class="removeBtn" data-city-name="${cityNameWithoutSpaces}">Remove</button>
    </div>
    `;
    // <button class="removeBtn" id="current-city-${cityNameWithoutSpaces}" onclick="removeCity('current-city-${cityNameWithoutSpaces}')">Remove</button>
  });

  let resultHTML = `
      ${resultDiv}
        <div class="clockDiv">${result}</div>
      `;

  document.getElementById("result").innerHTML = resultHTML;

  // Attach event listeners for remove buttons
  document.querySelectorAll(".removeBtn").forEach((button) => {
    button.addEventListener("click", function () {
      const cityNameWithoutSpaces = this.getAttribute("data-city-name");
      removeCity(cityNameWithoutSpaces);
    });
  });

  function removeCity(cityNameWithoutSpaces) {
    cities = cities.filter(
      (city) => city.name.replace(/\s+/g, "-") !== cityNameWithoutSpaces
    );
    saveCities();
    convertTime();
    Toastify({
      text: `City removed successfully!`,
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      duration: 3000,
    }).showToast();
  }
}

function convertTimeToCity(myTimezone, time, targetTimeZoneString) {
  let localTime = moment.tz(time, "HH:mm", myTimezone);
  let convertedTime = localTime.clone().tz(targetTimeZoneString);

  return convertedTime.format("HH:mm");
}

// Function to add a new city
function addCity() {
  const cityName = document
    .getElementById("city-name")
    .value.trim()
    .toLowerCase(); // Convert to lowercase
  const capitalizedCityName =
    cityName.charAt(0).toUpperCase() + cityName.slice(1); // Capitalize the first letter
  const cityOffset = parseFloat(document.getElementById("city-offset").value);

  // Check if city name and offset are provided
  if (capitalizedCityName && !isNaN(cityOffset)) {
    // Check if the city already exists
    if (
      cities.some(
        (city) => city.name.toLowerCase() === capitalizedCityName.toLowerCase()
      )
    ) {
      // Show toast message for existing city
      Toastify({
        text: `City "${capitalizedCityName}" already exists!`,
        backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
        duration: 3000,
      }).showToast();
    } else {
      const myTimezone = getSelectedTimeZone(
        "city-offset",
        "data-timezoneLocalStringForAddCity"
      );
      // Add the new city if it doesn't already exist
      cities.unshift({
        name: capitalizedCityName,
        offset: cityOffset,
        timeZoneString: myTimezone,
      }); // Add to the beginning of the array
      saveCities(); // Save updated cities to local storage
      // Show toast message for successful addition
      Toastify({
        text: `City "${capitalizedCityName}" added successfully!`,
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        duration: 3000,
      }).showToast();
    }
  } else {
    // Show toast message for invalid input
    Toastify({
      text: "Please provide a valid city name and UTC offset.",
      backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
      duration: 3000,
    }).showToast();
  }

  // Clear input fields
  document.getElementById("city-name").value = "";
  handleTimeInput();
}

function getCurrentTime(timezone) {
  let now = new Date();
  return now.toLocaleString("en-US", {
    timeZone: timezone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// Update the current time of each city every second
setInterval(() => {
  cities.forEach((city) => {
    const currentTimeElement = document.getElementById(
      `current-time-${city.name.replace(/\s+/g, "-")}`
    );
    if (currentTimeElement) {
      currentTimeElement.textContent = getCurrentTime(city.timeZoneString);
    }
  });
}, 1000);

convertTime();

// References to HTML elements
const addCityBtn = document.querySelector("#addCity");
const startTimeInput = document.getElementById("start-time");
const endTimeInput = document.getElementById("end-time");
const selectedTimezone = document.getElementById("timezone");
const cityNameInput = document.getElementById("city-name");

// Add event listeners for time inputs and timezone change
startTimeInput.addEventListener("input", handleTimeInput);
endTimeInput.addEventListener("input", handleTimeInput);
addCityBtn.addEventListener("click", addCity);
selectedTimezone.addEventListener("change", handleTimeInput);

// Add event listener for Enter key press on city name input
cityNameInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addCity(); // Call addCity function when Enter is pressed
  }
});

// Initialize settings on page load
initializeSettings();
document.addEventListener("DOMContentLoaded", initializeSettings);

/* -- Glow effect -- */

// const blob = document.querySelector("#blob");

// window.onpointermove = (event) => {
//   const { clientX, clientY } = event;

//   blob.animate(
//     {
//       left: `${clientX}px`,
//       top: `${clientY}px`,
//     },
//     { duration: 3000, fill: "forwards" }
//   );
// };

// Extra resources
// https://www.worldtimebuddy.com/?pl=1&lid=0,5391959,5128581,2643743,292223,30,1880252,1850147,2147714,2193733&h=0&hf=1
// https://www.worldtimebuddy.com/?pl=1&lid=5391959,5128581,0,2643743,292223,30,1880252,1850147,2147714,2193733&h=0&hf=1
