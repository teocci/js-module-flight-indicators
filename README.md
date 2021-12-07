## Flight Indicators JS (FIJS)

The Flight Indicators JS allows you to display high quality flight indicators using html, css3 and SVG images. You can easily customize and implementation these indicators for real time updates. The indicators' images are vectors (svg) so they do not lose quality if they are resized

### Disclaimer

This repository contains a basic implementation of flight indicators. The current version is not intended to be used as-is in applications as a library dependency, and will not be maintained as such. Bug fix contributions are welcome, but issues and feature requests will not be addressed constantly.

### Usage

Currently supported indicators are :

-   Air speed
-   Altimeter
-   Attitude (artificial horizon)
-   Heading
-   Turn Coordinator
-   Vertical speed

#### Initialization

To use FIJS just import the `css` and `js` files in your html file:

```html
<link rel="stylesheet" type="text/css" href="css/flight-indicators.css" />
<script src="js/jquery.flight-indicator.js"></script>
```

### Instantiation

Create a `<div>` section to put an indicator in :

```html
<div id="attitude"></div>
```

Then, when the `div` is ready in the DOM, you can run the indicator function :

```js
const airspeedElement = document.querySelector("#attitude");
const attitude = new FlightIndicators(
    attitudeElement,
    FlightIndicators.TYPE_ATTITUDE
);
```

The type may be `airspeed`, `altimeter`, `attitude`, `heading`, `vertical` or `coordinator`.

Initial settings can be modified using the `options` parameter. Here are the valid options and the default settings :

```js
var options = {
    size: 200, // Sets the size in pixels of the indicator
    roll: 0, // Roll angle in degrees for an attitude indicator
    pitch: 0, // Pitch angle in degrees for an attitude indicator
    turn: 0, // Sets rotation of the TC
    heading: 0, // Heading angle in degrees for an heading indicator
    verticalSpeed: 0, // Vertical speed in meters/hour for the variometer indicator
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
var attitude = $.flightIndicator("#attitude", "attitude");
attitude.setRoll(30); // Sets the roll to 30 degrees
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

![Indicators][1]

### Author

Teocci (teocci@yandex.com)

### License

The code supplied here is covered under the MIT Open Source License.

### Credits

Flight Indicators JS was developed based on [Flight Indicators jQuery plugin][2]

[1]: https://github.com/teocci/js-module-flight-indicators/blob/b7c093d5723fe5d9fc67a39466d871f9fc1dce49/assets/2021-12-07_20-35-57.png
[2]: http://sebmatton.github.io/
