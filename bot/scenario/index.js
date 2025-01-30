const { SaveAndLoadConfig } = require('../kyo-kan/loopsceinario_configure/save_and_load')
const { builders } = require('./buileders')
const InitialMessage = require("./subscenario/initialmessage")





const RootScenario = [
    InitialMessage.scenario
]


/**
 * @type { import('../kyo-kan/loopsceinario_configure/configure_type').LoopScenarioConfigure}
 */

const scenario = {
    RootScenario,
    LoopScenarios: {}
}
module.exports.config = SaveAndLoadConfig(scenario, builders).toJSON()