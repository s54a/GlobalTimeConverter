import "./style.css";
import "./clock.css";
import "toastify-js/src/toastify.css"; // Import the CSS file
import Toastify from "toastify-js";
import { clock } from "./clockComponent";
import { timeToValue } from "./time";

// Function to load cities from local storage
function loadCities() {
  const storedCities = localStorage.getItem("cities");
  if (storedCities) {
    return JSON.parse(storedCities);
  } else {
    return [
      { name: "San Francisco", offset: -7 },
      { name: "New York", offset: -4 },
      { name: "London", offset: 1 },
      { name: "Dubai", offset: 4 },
      { name: "Singapore", offset: 8 },
      { name: "Tokyo", offset: 9 },
      { name: "Berlin", offset: 2 },
      { name: "Paris", offset: 2 },
      { name: "Toronto", offset: -4 },
      { name: "Seattle", offset: -7 },
      { name: "Los Angeles", offset: -7 },
      { name: "Boston", offset: -4 },
      { name: "Montreal", offset: -4 },
      { name: "Washington D.C.", offset: -4 },
      { name: "Atlanta", offset: -4 },
      { name: "Austin", offset: -5 },
      { name: "Chicago", offset: -5 },
      { name: "Vancouver", offset: -7 },
      { name: "Dublin", offset: 1 },
      { name: "Amsterdam", offset: 2 },
      { name: "Zurich", offset: 2 },
      { name: "Stockholm", offset: 2 },
      { name: "Madrid", offset: 2 },
      { name: "Seoul", offset: 9 },
      { name: "Hong Kong", offset: 8 },
      { name: "Sydney", offset: 10 },
      { name: "Melbourne", offset: 10 },
      { name: "Wellington", offset: 12 },
      { name: "India", offset: 5.5 },
      { name: "Baker Island", offset: -12 },
      { name: "Midway Atoll", offset: -11 },
      { name: "Honolulu", offset: -10 },
      { name: "Marquesas Islands", offset: -9.5 },
      { name: "Anchorage", offset: -9 },
      { name: "Los Angeles", offset: -8 },
      { name: "Denver", offset: -7 },
      { name: "Chicago", offset: -6 },
      { name: "New York", offset: -5 },
      { name: "Caracas", offset: -4.5 },
      { name: "Santiago", offset: -4 },
      { name: "St. John's", offset: -3.5 },
      { name: "Buenos Aires", offset: -3 },
      { name: "Fernando de Noronha", offset: -2 },
      { name: "Azores", offset: -1 },
      { name: "London", offset: 0 },
      { name: "Paris", offset: 1 },
      { name: "Athens", offset: 2 },
      { name: "Moscow", offset: 3 },
      { name: "Tehran", offset: 3.5 },
      { name: "Dubai", offset: 4 },
      { name: "Kabul", offset: 4.5 },
      { name: "Karachi", offset: 5 },
      { name: "Kathmandu", offset: 5.75 },
      { name: "Dhaka", offset: 6 },
      { name: "Yangon", offset: 6.5 },
      { name: "Bangkok", offset: 7 },
      { name: "Singapore", offset: 8 },
      { name: "Eucla", offset: 8.75 },
      { name: "Tokyo", offset: 9 },
      { name: "Adelaide", offset: 9.5 },
      { name: "Sydney", offset: 10 },
      { name: "Lord Howe Island", offset: 10.5 },
      { name: "Vladivostok", offset: 11 },
      { name: "Auckland", offset: 12 },
      { name: "Chatham Islands", offset: 12.75 },
      { name: "Tongatapu", offset: 13 },
      { name: "Kiritimati", offset: 14 },
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
  const myTimezone = parseFloat(document.getElementById("timezone").value);
  const startTime = document
    .getElementById("start-time")
    .value.replace(":", "");
  const endTime = document.getElementById("end-time").value.replace(":", "");

  let cityName =
    document.getElementById("timezone").options[
      document.getElementById("timezone").selectedIndex
    ].text;

  let resultParagraph = ``;
  let resultDiv = `
    <div class="resultText">
              To work in the Cities below, here are your working hours in the Selected Timezone ${cityName}, based on your company's chosen working hours: (${startTime} to ${endTime})
        </div>
  `;
  let resultStartTime, resultEndTime, startDeg, endDeg;

  cities.forEach((city) => {
    resultStartTime = convertTimeToCity(myTimezone, startTime, city.offset);
    resultEndTime = convertTimeToCity(myTimezone, endTime, city.offset);

    startDeg = timeToValue(resultStartTime);
    endDeg = timeToValue(resultEndTime);

    let gradient;

    if (startDeg > 243.75) {
      gradient = `background: conic-gradient(red 0deg ${endDeg}deg,white ${endDeg}deg ${startDeg}deg,red ${startDeg}deg 0deg);`;
    } else {
      gradient = `background: conic-gradient(white 0deg ${startDeg}deg,red ${startDeg}deg ${endDeg}deg,white ${startDeg}deg ${endDeg}deg);`;
    }

    if (city.offset !== myTimezone) {
      resultParagraph += `
      <div class="resultTime">
      ${clock(gradient)}

      <div class="cityTime">${resultStartTime} - ${resultEndTime}</div>

      <div class="city">${city.name}</div>
      </div>
      `;
    }
  });

  let resultHTML = `
    ${resultDiv}
    <div class="resultParagraph">${resultParagraph}</div>
  `;

  document.getElementById("result").innerHTML = resultHTML;
}

function convertTimeToCity(myTimezone, time, targetOffset) {
  let timeInMilliseconds =
    time.substring(0, 2) * 3600000 + time.substring(3) * 60000;
  let myTimezoneInMilliseconds = myTimezone * 3600000;
  let targetTimezoneInMilliseconds = targetOffset * 3600000;

  let convertedTime = new Date(
    timeInMilliseconds + myTimezoneInMilliseconds - targetTimezoneInMilliseconds
  );
  let hours = ("0" + convertedTime.getUTCHours()).slice(-2);
  let minutes = ("0" + convertedTime.getUTCMinutes()).slice(-2);

  return `${hours}:${minutes}`;
}

// https://www.worldtimebuddy.com/?pl=1&lid=0,5391959,5128581,2643743,292223,30,1880252,1850147,2147714,2193733&h=0&hf=1

// https://www.worldtimebuddy.com/?pl=1&lid=5391959,5128581,0,2643743,292223,30,1880252,1850147,2147714,2193733&h=0&hf=1

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

convertTime();
const convertTimeBtn = document.querySelector("#convertTime");
const addCityBtn = document.querySelector("#addCity");

convertTimeBtn.addEventListener("click", convertTime);
addCityBtn.addEventListener("click", addCity);
// Add event listener to the timezone select element
document.getElementById("timezone").addEventListener("change", convertTime);

/* -- Glow effect -- */

const blob = document.querySelector("#blob");

window.onpointermove = (event) => {
  const { clientX, clientY } = event;

  blob.animate(
    {
      left: `${clientX}px`,
      top: `${clientY}px`,
    },
    { duration: 3000, fill: "forwards" }
  );
  // blob.style.left = `${clientX}px`;
  // blob.style.top = `${clientY}px`;
};
