# Global Time Converter

## Overview

Global Time Converter is a tool designed to help remote workers and traders easily calculate working hours across different timezones. This application allows users to select their timezone, set working hours, and view the corresponding times in various global cities.

## Personal Note

This project was born out of my own need to manage working hours across different timezones while contemplating remote job opportunities. I realized the challenge of coordinating with teams in different parts of the world and decided to create a solution that could benefit others facing the same issue.

## Features

### Timezone Selection

Select your timezone from a predefined list. The default selection is set to India. The current time will update immediately based on your selection.

### Working Hours

Set your company's working hours. The default values are from 0900 to 1700. As you change these values, the updated time will be shown immediately.

### City Management

- **Predefined Cities**: Includes 24 cities known for hiring remote developers.
- **Custom Cities**: Add custom cities by entering the city name and selecting the timezone. Newly added cities will appear at the top of the list.

### Analog Clocks

Displays analog clocks with a red sector indicating working or trading hours. Each clock shows:

- Place name
- Working or trading hours in text
- Current time at that place
- Timezone name/region
- Offset from UTC/GMT

### Daylight Savings Time (DST) Adjustment

Automatically adjusts for Daylight Savings Time using the Moment-Timezone package. This ensures accurate time calculations for regions that observe DST.

```js
function convertTimeToCity(myTimezone, time, targetTimeZoneString) {
  let localTime = moment.tz(time, "HH:mm", myTimezone);
  let convertedTime = localTime.clone().tz(targetTimeZoneString);
  return convertedTime.format("HH:mm");
}
```

### Use Case for Traders

Ideal for traders to determine trading hours across different stock markets. Includes all major stock exchanges listed in the [Wikipedia Article](https://en.wikipedia.org/wiki/List_of_major_stock_exchanges).

## Future Development

Plans to create an NPM package for the analog clock component, allowing users to visually represent time sectors.

## Tech Stack

- **Frontend**: Vanilla JavaScript
- **Build Tool**: Vite
- **Time Management**: Moment-Timezone

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/global-time-converter.git
cd global-time-converter
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

## Usage

1. Open the application in your browser.
2. Select your timezone.
3. Set your working hours.
4. Add or remove cities as needed.
5. View the corresponding working/trading hours on the analog clocks.

## Website Preview

![alt text](./preview.png)

## Deployed Link

The project is deployed and accessible online. You can visit it by following this link:

[Global Time Converter](https://r3r.vercel.app)

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Thanks

Special thanks to the online resources, ChatGPT and communities that provided valuable assistance during the development of this project.

## Current Issues

Currently, there is one known issue with the analog clocks when inputting working hours exceeding 10 hours. In such cases, the analog clock may stop displaying the sector but will continue to show the time in textual form. Traders need not worry about this issue as their working hours are synchronized with market times sourced from the Wikipedia article on major stock exchanges.

---
