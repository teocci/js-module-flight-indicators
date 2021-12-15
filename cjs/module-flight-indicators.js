/**
 * Created by Teocci.
 * Author: teocci@yandex.com on 2021-Nov-04
 */
module.exports = class FlightIndicators {
    static TAG = 'instrument'

    static TYPE_HEADING = 'heading'
    static TYPE_AIRSPEED = 'airspeed'
    static TYPE_ALTIMETER = 'altimeter'
    static TYPE_VERTICAL_SPEED = 'vertical'
    static TYPE_ATTITUDE = 'attitude'
    static TYPE_TURN_COORDINATOR = 'coordinator'

    static TYPES = [
        FlightIndicators.TYPE_HEADING,
        FlightIndicators.TYPE_AIRSPEED,
        FlightIndicators.TYPE_ALTIMETER,
        FlightIndicators.TYPE_VERTICAL_SPEED,
        FlightIndicators.TYPE_ATTITUDE,
        FlightIndicators.TYPE_TURN_COORDINATOR,
    ]

    static CONSTANTS = {
        pitch_bound: 30,
        vertical_speed_bound: 1.95,
        airspeed_bound_l: 0,
        airspeed_bound_h: 160
    }

    static DEFAULT_OPTIONS = {
        size: 200,
        roll: 0,
        pitch: 0,
        turn: 0,
        heading: 0,
        verticalSpeed: 0,
        airspeed: 0,
        altitude: 0,
        pressure: 1000,
        hideBox: true,
        imagesDirectory: '../img'
    }

    constructor(placeholder, type, options) {
        this.placeholder = placeholder
        this.type = type
        this.settings = this.simpleMerge(FlightIndicators.DEFAULT_OPTIONS, options)
        
        this.createInstrument()
    }

    createInstrument() {
        const imgDirectory = this.settings['imagesDirectory']

        let instrument
        switch (this.type) {
            case FlightIndicators.TYPE_HEADING:
                instrument = this.createHeadingIndicator(imgDirectory)
                break
            case FlightIndicators.TYPE_AIRSPEED:
                instrument = this.createAirspeedIndicator(imgDirectory)
                break
            case FlightIndicators.TYPE_ALTIMETER:
                instrument = this.createAltimeterIndicator(imgDirectory)
                break
            case FlightIndicators.TYPE_VERTICAL_SPEED:
                instrument = this.createVerticalSpeedIndicator(imgDirectory)
                break
            case FlightIndicators.TYPE_ATTITUDE:
                instrument = this.createAttitudeIndicator(imgDirectory)
                break
            case FlightIndicators.TYPE_TURN_COORDINATOR:
                instrument = this.createCoordinatorIndicator(imgDirectory)
                break
            default:
                return null
        }

        this.resize(this.settings.size)
        this.toggleBox(this.settings.hideBox)
    }

    updateHeading(heading) {
        let meter = this.placeholder.querySelector('div.instrument.heading div.heading')
        meter.style.transform = `rotate(${-heading}deg)`
    }

    updateRoll(roll) {
        let meter = this.placeholder.querySelector('div.instrument.attitude div.roll')
        meter.style.transform = `rotate(${roll}deg)`
    }

    updatePitch(pitch) {
        // alert(pitch);
        if (pitch > FlightIndicators.CONSTANTS.pitch_bound) {
            pitch = FlightIndicators.CONSTANTS.pitch_bound;
        } else if (pitch < -FlightIndicators.CONSTANTS.pitch_bound) {
            pitch = -FlightIndicators.CONSTANTS.pitch_bound;
        }

        let meter = this.placeholder.querySelector('div.instrument.attitude div.roll div.pitch')
        meter.style.top = `${pitch * 0.7}%`
    }

    updateCoordinator(turn) {
        let meter = this.placeholder.querySelector('div.instrument.turn-coordinator div.turn')
        meter.style.transform = `rotate(${turn}deg)`
    }

    updateVerticalSpeed(vSpeed) {
        if (vSpeed > FlightIndicators.CONSTANTS.vertical_speed_bound) {
            vSpeed = FlightIndicators.CONSTANTS.vertical_speed_bound;
        } else if (vSpeed < -FlightIndicators.CONSTANTS.vertical_speed_bound) {
            vSpeed = -FlightIndicators.CONSTANTS.vertical_speed_bound;
        }
        vSpeed = vSpeed * 90;

        let meter = this.placeholder.querySelector('div.instrument.vertical-speed div.vertical-speed')
        meter.style.transform = `rotate(${vSpeed}deg)`
    }

    updateAirSpeed(speed) {
        if (speed > FlightIndicators.CONSTANTS.airspeed_bound_h) {
            speed = FlightIndicators.CONSTANTS.airspeed_bound_h;
        } else if (speed < FlightIndicators.CONSTANTS.airspeed_bound_l) {
            speed = FlightIndicators.CONSTANTS.airspeed_bound_l;
        }
        speed = 90 + speed * 2;

        let meter = this.placeholder.querySelector('div.instrument.airspeed div.speed')
        meter.style.transform = `rotate(${speed}deg)`
    }

    updateAltitude(altitude) {
        let needle = 90 + altitude % 1e3 * 360 / 1e3;
        let needleSmall = altitude / 1e4 * 360;

        let meter = this.placeholder.querySelector('div.instrument.altimeter div.needle')
        meter.style.transform = `rotate(${needle}deg)`

        let smallMeter = this.placeholder.querySelector('div.instrument.altimeter div.small-needle')
        smallMeter.style.transform = `rotate(${needleSmall}deg)`
    }

    updatePressure(pressure) {
        pressure = 2 * pressure - 1980;

        let meter = this.placeholder.querySelector('div.instrument.altimeter div.pressure')
        meter.style.transform = `rotate(${pressure}deg)`
    }

    resize(size) {
        let instrument = this.placeholder.querySelector('div.instrument')
        instrument.style.height = `${size}px`
        instrument.style.width = `${size}px`
    }

    toggleBox(hide) {
        let box = this.placeholder.querySelector('img.box.background')
        box.classList.toggle('hidden', hide)
    }

    showBox() {
        // let box = this.placeholder.querySelector('img.box.background')
        let box = this.placeholder.querySelector('img.box.background')
        box.classList.remove('hidden')
    }

    hideBox() {
        let box = this.placeholder.querySelector('img.box.background')
        box.classList.add('hidden')
    }


    simpleMerge(...objects) {
        return objects.reduce((p, o) => {
            return {...p, ...o}
        }, {})
    }

    mergeOptions(...objects) {
        let extended = {}
        let deep = false
        let i = 0
        let length = objects.length

        // Check if a deep merge
        const isBoolean = b => 'boolean' === typeof b
        if (isBoolean(objects[0])) {
            deep = objects[0]
            i++
        }

        // Loop through each object and conduct a merge
        for (; i < length; i++) {
            const object = objects[i]
            this.mergeObject(extended, object, deep)
        }

        return extended
    }

    // Merge the object into the extended object
    mergeObject(extended, object, deep) {
        for (const prop in object) {
            if (object.hasOwnProperty(prop)) {
                // If deep merge and property is an object, merge properties
                const isObject = o => o?.constructor === Object
                if (deep && isObject(object[prop])) {
                    extended[prop] = this.mergeOptions(true, extended[prop], object[prop])
                } else {
                    extended[prop] = object[prop]
                }
            }
        }
    }

    toggle(val) {
        this.placeholder.classList.toggle('hidden', val)
    }

    show() {
        this.placeholder.classList.remove('hidden')
    }

    hide() {
        this.placeholder.classList.add('hidden')
    }

    createDivIndicator(className) {
        const instrument = document.createElement('div')
        instrument.setAttribute('class', `instrument ${className}`)

        return instrument
    }

    createFiBoxImage(imgDirectory) {
        const fiBox = this.createImgBox(imgDirectory, 'fi_box.svg')
        fiBox.classList.add('background')

        return fiBox
    }

    createDivBox(name, imgDirectory, imgName) {
        const div = document.createElement('div')
        div.setAttribute('class', `${name} box`)

        const img = this.createImgBox(imgDirectory, imgName)
        div.appendChild(img)

        return div
    }

    createImgBox(imgDirectory, imgSrc) {
        const img = document.createElement('img')
        img.setAttribute('class', 'box')
        img.src = `${imgDirectory}/${imgSrc}`

        return img
    }

    createNeedleBox(name, imgDirectory) {
        return this.createDivBox(name, imgDirectory, 'fi_needle.svg')
    }

    createRollBox(imgDirectory) {
        const name = 'roll'
        const roll = this.createDivBox(name, imgDirectory, 'horizon_back.svg')
        const pitch = this.createDivBox('pitch',imgDirectory, 'horizon_ball.svg')
        const hcImgBox = this.createImgBox(imgDirectory, 'horizon_circle.svg')

        roll.appendChild(pitch)
        roll.appendChild(hcImgBox)

        return roll;
    }

    createMechanicsBox(imgDirectory, element = null) {
        const name = 'mechanics'
        const mechanics = this.createDivBox(name, imgDirectory, 'fi_circle.svg')

        if (element) mechanics.prepend(element)

        return mechanics
    }

    createHeadingIndicator(imgDirectory) {
        const name = 'heading'

        const instrument = this.createDivIndicator(name)
        const fiBox = this.createFiBoxImage(imgDirectory)

        const heading = this.createDivBox('heading', imgDirectory, 'heading_yaw.svg')

        const hmImgBox = this.createImgBox(imgDirectory, 'heading_mechanics.svg')
        const mechanics = this.createMechanicsBox(imgDirectory, hmImgBox)

        instrument.appendChild(fiBox)
        instrument.appendChild(heading)
        instrument.appendChild(mechanics)

        this.placeholder.appendChild(instrument)

        this.updateHeading(this.settings.heading)

        return instrument
    }

    createAltimeterIndicator(imgDirectory) {
        const name = 'altimeter'

        const instrument = this.createDivIndicator(name)

        const fiBox = this.createFiBoxImage(imgDirectory)

        const pressure = this.createDivBox('pressure', imgDirectory, 'altitude_pressure.svg')

        const ticks = this.createImgBox(imgDirectory, 'altitude_ticks.svg')

        const smallNeedle = this.createDivBox('small-needle', imgDirectory, 'fi_needle_small.svg')

        const needle = this.createNeedleBox('needle', imgDirectory)

        const mechanics = this.createMechanicsBox(imgDirectory)

        instrument.appendChild(fiBox)
        instrument.appendChild(pressure)
        instrument.appendChild(ticks)
        instrument.appendChild(smallNeedle)
        instrument.appendChild(needle)
        instrument.appendChild(mechanics)

        this.placeholder.appendChild(instrument)

        this.updateAltitude(this.settings.altitude);
        this.updatePressure(this.settings.pressure);

        return instrument
    }

    createAirspeedIndicator(imgDirectory) {
        const name = 'airspeed'

        const instrument = this.createDivIndicator(name)

        const fiBox = this.createFiBoxImage(imgDirectory)

        const speedMechanics = this.createImgBox(imgDirectory, 'speed_mechanics.svg')

        const speed = this.createNeedleBox('speed', imgDirectory)

        const mechanics = this.createMechanicsBox(imgDirectory)

        instrument.appendChild(fiBox)
        instrument.appendChild(speedMechanics)
        instrument.appendChild(speed)
        instrument.appendChild(mechanics)

        this.placeholder.appendChild(instrument)

        this.updateAirSpeed(this.settings.airspeed);

        return instrument
    }

    createAttitudeIndicator(imgDirectory) {
        const name = 'attitude'

        const instrument = this.createDivIndicator(name)

        const fiBox = this.createFiBoxImage(imgDirectory)

        const roll = this.createRollBox(imgDirectory)

        const hmImgBox = this.createImgBox(imgDirectory, 'horizon_mechanics.svg')
        const mechanics = this.createMechanicsBox(imgDirectory, hmImgBox)

        instrument.appendChild(fiBox)
        instrument.appendChild(roll)
        instrument.appendChild(mechanics)

        this.placeholder.appendChild(instrument)

        this.updateRoll(this.settings.roll);
        this.updatePitch(this.settings.pitch);

        return instrument
    }

    createCoordinatorIndicator(imgDirectory) {
        const name = 'turn-coordinator'

        const instrument = this.createDivIndicator(name)

        const fiBox = this.createFiBoxImage(imgDirectory)

        const tiBox = this.createImgBox(imgDirectory, 'turn_coordinator.svg')

        const turn = this.createDivBox('turn', imgDirectory, 'fi_tc_airplane.svg')

        const mechanics = this.createMechanicsBox(imgDirectory)

        instrument.appendChild(fiBox)
        instrument.appendChild(tiBox)
        instrument.appendChild(turn)
        instrument.appendChild(mechanics)

        this.placeholder.appendChild(instrument)

        this.updateCoordinator(this.settings.turn);

        return instrument
    }

    createVerticalSpeedIndicator(imgDirectory) {
        const name = 'vertical-speed'

        const instrument = this.createDivIndicator(name)

        const fiBox = this.createFiBoxImage(imgDirectory)

        const vmiBox = this.createImgBox(imgDirectory, 'vertical_mechanics.svg')
        
        const speed = this.createNeedleBox('vertical-speed', imgDirectory)

        const mechanics = this.createMechanicsBox(imgDirectory)

        instrument.appendChild(fiBox)
        instrument.appendChild(vmiBox)
        instrument.appendChild(speed)
        instrument.appendChild(mechanics)

        this.placeholder.appendChild(instrument)

        this.updateVerticalSpeed(this.settings.verticalSpeed);

        return instrument
    }
}