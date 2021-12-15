import FlightIndicators from '../esm/module-flight-indicators.mjs'

const airspeedElement = document.querySelector('#airspeed')
const attitudeElement = document.querySelector('#attitude')
const altimeterElement = document.querySelector('#altimeter')
const coordinatorElement = document.querySelector('#coordinator')
const headingElement = document.querySelector('#heading')
const verticalElement = document.querySelector('#vertical')

const airspeed = new FlightIndicators(airspeedElement, FlightIndicators.TYPE_AIRSPEED)
const attitude = new FlightIndicators(attitudeElement, FlightIndicators.TYPE_ATTITUDE)
const altimeter = new FlightIndicators(altimeterElement, FlightIndicators.TYPE_ALTIMETER)
const coordinator = new FlightIndicators(coordinatorElement, FlightIndicators.TYPE_TURN_COORDINATOR)
const heading = new FlightIndicators(headingElement, FlightIndicators.TYPE_HEADING)
const vertical = new FlightIndicators(verticalElement, FlightIndicators.TYPE_VERTICAL_SPEED)

// Update at 20Hz
let increment = 0
setInterval(function () {
    // Airspeed update
    airspeed.updateAirSpeed(80 + 80 * Math.sin(increment / 10))
    // airspeed.resize(600)

    // Attitude update
    attitude.updateRoll(30 * Math.sin(increment / 10))
    attitude.updatePitch(50 * Math.sin(increment / 20))
    // attitude.resize(600)

    // Altimeter update
    altimeter.updateAltitude(10 * increment);
    altimeter.updatePressure(1000 + 3 * Math.sin(increment / 50))
    // altimeter.resize(600)
    // altimeter.showBox()

    // TC update - note that the TC appears opposite the angle of the attitude indicator, as it mirrors the actual wing up/down position
    coordinator.updateCoordinator((30 * Math.sin(increment / 10)) * -1)
    // coordinator.resize(600)

    // Heading update
    heading.updateHeading(increment)

    // Vertical speed update
    vertical.updateVerticalSpeed(2 * Math.sin(increment / 10))
    increment++
}, 50)