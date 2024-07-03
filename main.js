import "./style.css";
import "./clock.css";
import "toastify-js/src/toastify.css"; // Import the CSS file
import Toastify from "toastify-js";
import moment from "moment-timezone";
import { clock } from "./clockComponent";
import { timeToValue } from "./time";

// Function to load cities from local storage
function loadCities() {
  const storedCities = localStorage.getItem("cities");
  if (storedCities) {
    return JSON.parse(storedCities);
  } else {
    return [
      {
        name: "San Francisco",
        offset: -7,
        isMarket: false,
        isAffectedByDST: true,
        timeZoneString: "America/Los_Angeles",
      },
      {
        name: "New York",
        offset: -4,
        isMarket: false,
        isAffectedByDST: true,
        timeZoneString: "America/New_York",
      },
      {
        name: "London",
        offset: 1,
        isMarket: false,
        isAffectedByDST: true,
        timeZoneString: "Europe/London",
      },
      {
        name: "Dubai",
        offset: 4,
        isMarket: false,
        isAffectedByDST: false,
        timeZoneString: "Asia/Dubai",
      },
      {
        name: "Singapore",
        offset: 8,
        isMarket: false,
        isAffectedByDST: false,
        timeZoneString: "Asia/Singapore",
      },
      {
        name: "Tokyo",
        offset: 9,
        isMarket: false,
        isAffectedByDST: false,
        timeZoneString: "Asia/Tokyo",
      },
      {
        name: "Berlin",
        offset: 2,
        isMarket: false,
        isAffectedByDST: true,
        timeZoneString: "Europe/Berlin",
      },
      {
        name: "Paris",
        offset: 2,
        isMarket: false,
        isAffectedByDST: true,
        timeZoneString: "Europe/Paris",
      },
      {
        name: "Toronto",
        offset: -4,
        isMarket: false,
        isAffectedByDST: true,
        timeZoneString: "America/Toronto",
      },
      {
        name: "Seattle",
        offset: -7,
        isMarket: false,
        isAffectedByDST: true,
        timeZoneString: "America/Los_Angeles",
      },
      {
        name: "Los Angeles",
        offset: -7,
        isMarket: false,
        isAffectedByDST: true,
        timeZoneString: "America/Los_Angeles",
      },
      {
        name: "Boston",
        offset: -4,
        isMarket: false,
        isAffectedByDST: true,
        timeZoneString: "America/New_York",
      },
      {
        name: "Montreal",
        offset: -4,
        isMarket: false,
        isAffectedByDST: true,
        timeZoneString: "America/Toronto",
      },
      {
        name: "Washington D.C.",
        offset: -4,
        isMarket: false,
        isAffectedByDST: true,
        timeZoneString: "America/New_York",
      },
      {
        name: "Atlanta",
        offset: -4,
        isMarket: false,
        isAffectedByDST: true,
        timeZoneString: "America/New_York",
      },
      {
        name: "Austin",
        offset: -5,
        isMarket: false,
        isAffectedByDST: true,
        timeZoneString: "America/Chicago",
      },
      {
        name: "Chicago",
        offset: -5,
        isMarket: false,
        isAffectedByDST: true,
        timeZoneString: "America/Chicago",
      },
      {
        name: "Vancouver",
        offset: -7,
        isMarket: false,
        isAffectedByDST: true,
        timeZoneString: "America/Vancouver",
      },
      {
        name: "Dublin",
        offset: 1,
        isMarket: false,
        isAffectedByDST: true,
        timeZoneString: "Europe/Dublin",
      },
      {
        name: "Amsterdam",
        offset: 2,
        isMarket: false,
        isAffectedByDST: true,
        timeZoneString: "Europe/Amsterdam",
      },
      {
        name: "Zurich",
        offset: 2,
        isMarket: false,
        isAffectedByDST: true,
        timeZoneString: "Europe/Zurich",
      },
      {
        name: "Stockholm",
        offset: 2,
        isMarket: false,
        isAffectedByDST: true,
        timeZoneString: "Europe/Stockholm",
      },
      {
        name: "Madrid",
        offset: 2,
        isMarket: false,
        isAffectedByDST: true,
        timeZoneString: "Europe/Madrid",
      },
      {
        name: "Seoul",
        offset: 9,
        isMarket: false,
        isAffectedByDST: false,
        timeZoneString: "Asia/Seoul",
      },
      {
        name: "Hong Kong",
        offset: 8,
        isMarket: false,
        isAffectedByDST: false,
        timeZoneString: "Asia/Hong_Kong",
      },
      {
        name: "Sydney",
        offset: 10,
        isMarket: false,
        isAffectedByDST: true,
        timeZoneString: "Australia/Sydney",
      },
      {
        name: "Melbourne",
        offset: 10,
        isMarket: false,
        isAffectedByDST: true,
        timeZoneString: "Australia/Melbourne",
      },
      {
        name: "Wellington",
        offset: 12,
        isMarket: false,
        isAffectedByDST: true,
        timeZoneString: "Pacific/Auckland",
      },
      {
        name: "New York Stock Exchange (NYSE)",
        offset: -4,
        marketCap: 25.0,
        openTime: "09:30",
        closeTime: "16:00",
        isMarket: true,
        isAffectedByDST: true,
        timeZoneString: "America/New_York",
      },
      {
        name: "NASDAQ",
        offset: -4,
        marketCap: 21.7,
        openTime: "09:30",
        closeTime: "16:00",
        isMarket: true,
        isAffectedByDST: true,
        timeZoneString: "America/New_York",
      },
      {
        name: "Euronext (ENX)",
        offset: 1,
        marketCap: 7.2,
        openTime: "09:00",
        closeTime: "17:30",
        isMarket: true,
        isAffectedByDST: true,
        timeZoneString: "Europe/Amsterdam",
      },
      {
        name: "Shanghai Stock Exchange (SSE)",
        offset: 8,
        marketCap: 6.7,
        openTime: "09:30",
        closeTime: "15:00",
        isMarket: true,
        isAffectedByDST: false,
        timeZoneString: "Asia/Shanghai",
      },
      {
        name: "Tokyo Stock Exchange (TSE)",
        offset: 9,
        marketCap: 6.46,
        openTime: "09:00",
        closeTime: "15:00",
        isMarket: true,
        isAffectedByDST: false,
        timeZoneString: "Asia/Tokyo",
      },
      {
        name: "Shenzhen Stock Exchange (SZSE)",
        offset: 8,
        marketCap: 6.22,
        openTime: "09:30",
        closeTime: "15:00",
        isMarket: true,
        isAffectedByDST: false,
        timeZoneString: "Asia/Shanghai",
      },
      {
        name: "Bombay Stock Exchange (BSE)",
        offset: 5.5,
        marketCap: 5.1,
        openTime: "09:15",
        closeTime: "15:30",
        isMarket: true,
        isAffectedByDST: false,
        timeZoneString: "Asia/Kolkata",
      },
      {
        name: "National Stock Exchange of India (NSE)",
        offset: 5.5,
        marketCap: 5.01,
        openTime: "09:15",
        closeTime: "15:30",
        isMarket: true,
        isAffectedByDST: false,
        timeZoneString: "Asia/Kolkata",
      },
      {
        name: "Hong Kong Stock Exchange (HKEX)",
        offset: 8,
        marketCap: 3.98,
        openTime: "09:30",
        closeTime: "16:00",
        isMarket: true,
        isAffectedByDST: false,
        timeZoneString: "Asia/Hong_Kong",
      },
      {
        name: "Toronto Stock Exchange (TSX)",
        offset: -5,
        marketCap: 3.26,
        openTime: "09:30",
        closeTime: "16:00",
        isMarket: true,
        isAffectedByDST: true,
        timeZoneString: "America/Toronto",
      },
      {
        name: "London Stock Exchange (LSE)",
        offset: 0,
        marketCap: 3.18,
        openTime: "08:00",
        closeTime: "16:30",
        isMarket: true,
        isAffectedByDST: true,
        timeZoneString: "Europe/London",
      },
      {
        name: "Saudi Stock Exchange (TADAWUL)",
        offset: 3,
        marketCap: 2.71,
        openTime: "10:00",
        closeTime: "15:00",
        isMarket: true,
        isAffectedByDST: false,
        timeZoneString: "Asia/Riyadh",
      },
      {
        name: "German Stock Exchange (XETRA)",
        offset: 1,
        marketCap: 2.37,
        openTime: "08:00",
        closeTime: "17:30",
        isMarket: true,
        isAffectedByDST: true,
        timeZoneString: "Europe/Berlin",
      },
      {
        name: "SIX Swiss Exchange (SIX)",
        offset: 1,
        marketCap: 1.95,
        openTime: "09:00",
        closeTime: "17:30",
        isMarket: true,
        isAffectedByDST: true,
        timeZoneString: "Europe/Zurich",
      },
      {
        name: "Nasdaq Nordic and Baltic Exchanges (OMX)",
        offset: 1,
        marketCap: 1.94,
        openTime: "09:00",
        closeTime: "17:00",
        isMarket: true,
        isAffectedByDST: true,
        timeZoneString: "Europe/Stockholm",
      },
      {
        name: "Korea Exchange (KRX)",
        offset: 9,
        marketCap: 1.83,
        openTime: "09:00",
        closeTime: "15:30",
        isMarket: true,
        isAffectedByDST: false,
        timeZoneString: "Asia/Seoul",
      },
      {
        name: "Taiwan Stock Exchange (TWSE)",
        offset: 8,
        marketCap: 1.59,
        openTime: "09:00",
        closeTime: "13:30",
        isMarket: true,
        isAffectedByDST: false,
        timeZoneString: "Asia/Taipei",
      },
      {
        name: "Australian Securities Exchange (ASX)",
        offset: 10,
        marketCap: 1.55,
        openTime: "10:00",
        closeTime: "16:00",
        isMarket: true,
        isAffectedByDST: true,
        timeZoneString: "Australia/Sydney",
      },
      {
        name: "Johannesburg Stock Exchange (JSE)",
        offset: 2,
        marketCap: 1.36,
        openTime: "09:00",
        closeTime: "17:00",
        isMarket: true,
        isAffectedByDST: true,
        timeZoneString: "Africa/Johannesburg",
      },
      {
        name: "Tehran Stock Exchange (TSE)",
        offset: 3.5,
        marketCap: 1.29,
        openTime: "09:30",
        closeTime: "15:30",
        isMarket: true,
        isAffectedByDST: false,
        timeZoneString: "Asia/Tehran",
      },
    ];
  }
}

// Function to save cities to local storage
function saveCities() {
  localStorage.setItem("cities", JSON.stringify(cities));
}

// Load cities from local storage
let cities = loadCities();

function convertTime() {
  function getSelectedTimeZone() {
    const timezoneSelect = document.getElementById("timezone");
    const selectedOption = timezoneSelect.options[timezoneSelect.selectedIndex];
    const timeZoneLocalString = selectedOption.getAttribute(
      "data-timezonelocalstring"
    );
    return timeZoneLocalString;
  }

  const myTimezone = getSelectedTimeZone();

  const startTime = document.getElementById("start-time").value;
  const endTime = document.getElementById("end-time").value;

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

    startDeg = timeToValue(resultStartTime);
    endDeg = timeToValue(resultEndTime);

    let gradient;

    if (startDeg > 243.75) {
      gradient = `background: conic-gradient(red 0deg ${endDeg}deg,#ddd ${endDeg}deg ${startDeg}deg,red ${startDeg}deg 0deg);`;
    } else {
      gradient = `background: conic-gradient(#ddd 0deg ${startDeg}deg,red ${startDeg}deg ${endDeg}deg,#ddd ${startDeg}deg ${endDeg}deg);`;
    }

    result += `
          <div class="resultTime">
          ${clock(gradient)}

            <div class="city">${city.name}</div>
            <div class="city">${resultStartTime} - ${resultEndTime}</div>
            <div class="currentCityTime city" id="current-time-${city.name.replace(
              /\s+/g,
              "-"
            )}">${getCurrentTime(city.timeZoneString)}</div>
            <div class="city timeZoneString">${city.timeZoneString} UTC ${
      city.offset
    }</div>
          </div>
          `;
  });

  let resultHTML = `
      ${resultDiv}
        <div class="clockDiv">${result}</div>
      `;

  document.getElementById("result").innerHTML = resultHTML;
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
      // Add the new city if it doesn't already exist
      cities.unshift({ name: capitalizedCityName, offset: cityOffset }); // Add to the beginning of the array
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
  document.getElementById("city-offset").value = "";
  convertTime();
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

const addCityBtn = document.querySelector("#addCity");
const startTimeInput = document.getElementById("start-time");
const endTimeInput = document.getElementById("end-time");
const selectedTimezone = document.getElementById("timezone");

addCityBtn.addEventListener("click", addCity);
selectedTimezone.addEventListener("change", convertTime);
startTimeInput.addEventListener("input", convertTime);
endTimeInput.addEventListener("input", convertTime);

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
