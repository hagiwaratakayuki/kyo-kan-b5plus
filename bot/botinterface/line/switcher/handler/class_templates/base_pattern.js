const { SwitcherHandler } = require("../../../../types/switcher/handler_class");
const { getLoopScenario } = require("../../../../loopscenario/get_loop_scenario");







class BasePattern extends SwitcherHandler {
    connectorClass = null
    async exec(request) {
        /**
         * @type {import("../../../connecter").LineConnector}
         */
        const connecter = this._constructConnector(request)

        const targetId = getIdFromEvent(request.event)
        const [isStart, [loopScenario, builderConfigMap]] = await Promise.all([getUseState(targetId, "isStart"), getLoopScenario(targetId, 'current')])

        return await connecter.run(request, loopScenario, isStart, builderConfigMap)
    }
    _constructConnector(request) {
        return new this.connectorClass()

    }
}

module.exports = { BasePattern }

