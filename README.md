## Flight Indicators JS (FIJS)

The Flight Indicators JS allows you to display high quality flight indicators using html, css3 and SVG images. You can easily customize and implementation these indicators for real time updates. The indicators' images are vectors (svg) so they do not lose quality if they are resized

[![NPM Status](https://img.shields.io/npm/v/flight-indicators-js.svg?style=flat)][1]

### Disclaimer

This repository contains a basic implementation of flight indicators. The current version is not intended to be used as-is in applications as a library dependency, and will not be maintained as such. Bug fix contributions are welcome, but issues and feature requests will not be addressed constantly.

### Usage

Currently supported indicators are :

-   Air speed
-   Altimeter
-   Attitude (Artificial Horizon)
-   Heading
-   Turn Coordinator
-   Vertical speed

#### Initialization

To use FIJS just import the `css` and `js` files in your html file:

```html
<link rel="stylesheet" type="text/css" href="css/flight-indicators.css" />
<script src="js/flight-indicator.js"></script>
```

To import into a module use:
```js
import FlightIndicators from './module-flight-indicators.js'
```

### Instantiation

Create a `<div>` element to place the indicator:

```html
<div id="attitude"></div>
```

Then, when the `div` is loaded and ready in the DOM, create an instance object of `FlightIndicators`:

```js
// declares the placeholder
const attitudeElement = document.querySelector("#attitude")

// creates an FlightIndicators' object
const attitude = new FlightIndicators(
    attitudeElement,
    FlightIndicators.TYPE_ATTITUDE
)
```

The type may be `airspeed`, `altimeter`, `attitude`, `heading`, `vertical` or `coordinator`:

```js
TYPE_HEADING = 'heading'
TYPE_AIRSPEED = 'airspeed'
YPE_ALTIMETER = 'altimeter'
TYPE_VERTICAL_SPEED = 'vertical'
TYPE_ATTITUDE = 'attitude'
TYPE_TURN_COORDINATOR = 'coordinator'
```

Initial settings can be modified using the `options` parameter. Here are the valid options and the default settings :

```js
const options = {
    size: 200, // Sets the size in pixels of the indicator
    roll: 0, // Roll angle in degrees for an attitude indicator
    pitch: 0, // Pitch angle in degrees for an attitude indicator
    turn: 0, // Sets rotation of the TC
    heading: 0, // Heading angle in degrees for an heading indicator
    verticalSpeed: 0, // Vertical speed in km/min for the vertical speed indicator
    airspeed: 0, // Air speed in meters/hour for an air speed indicator
    altitude: 0, // Altitude in meters for an altimeter indicator
    pressure: 1000, // Pressure in hPa for an altimeter indicator
    hideBox: true, // Sets if the outer squared box is visible or not (true or false)
    imagesDirectory: "img/", // The directory where the images are saved to
};
```

### Updating the indicator information

Some methods are used to update the indicators, giving the opportunity to create realtime GUI !

The way to use it is really simple.

```js
attitude.updateRoll(30); // Sets the roll to 30 degrees
```

Here are the valid methods :

```js
indicator.updateRoll(roll); // Sets the roll of an attitude indicator
indicator.updatePitch(pitch); // Sets the pitch of an attitude indicator
indicator.updateCoordinator(turn); // Sets the turn of an coordinator indicator
indicator.updateHeading(heading); // Sets the heading of an heading indicator
indicator.updateVerticalSpeed(vSpeed); // Sets the climb speed of an variometer indicator
indicator.updateAirSpeed(speed); // Sets the speed of an airspeed indicator
indicator.updateAltitude(altitude); // Sets the altitude of an altimeter indicator
indicator.updatePressure(pressure); // Sets the pressure of an altimeter indicator
indicator.resize(size); // Sets the size of any indicators
indicator.showBox(); // Make the outer squared box of any instrument visible
indicator.hideBox(); // Make the outer squared box of any instrument invisible
```

![Indicators][2]

### Author

Teocci (teocci@yandex.com)

### License

The code supplied here is covered under the MIT Open Source License.

### Credits

Flight Indicators JS svg images was developed based on [Flight Indicators jQuery plugin][3].

[1]: https://www.npmjs.com/package/flight-indicators-js
[2]: https://github.com/teocci/js-module-flight-indicators/blob/main/assets/fijs-sample.png?raw=true
[3]: http://sebmatton.github.io/
