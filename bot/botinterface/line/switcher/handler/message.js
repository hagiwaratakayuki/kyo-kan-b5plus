const { getLoopScenario } = require("../../../loopscenario/get_loop_scenario")
const { LineConnector } = require("../../connecter")


/**
 * @type {import("../../types/switchhandler").LineSwitchHandler}
 */
const Handler = {

    async message(request) {
        const connecter = new LineConnector()

        const targetId = getIdFromEvent(request.event)
        const [isStart, [loopScenario, builderConfigMap]] = await Promise.all([getUseState(targetId, "isStart"), getLoopScenario(targetId, 'current')])

        return await connecter.run(request, loopScenario, isStart, builderConfigMap)

    }
}

module.exports = { Handler } 