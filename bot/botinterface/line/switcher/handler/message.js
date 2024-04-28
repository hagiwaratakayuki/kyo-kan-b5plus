const { getLoopScenario } = require("../../../loopscenario/get_loop_scenario")
const { LineConnector } = require("../../connecter")


/**
 * @type {import("../../types/switchhandler").LineSwitchHandler}
 */
const Handler = {

    message(switcher, request) {
        request.event.source

    }
}

module.exports = { Handler } 