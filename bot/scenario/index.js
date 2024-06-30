const { SaveAndLoadConfig } = require('../kyo-kan/loopsceinario_configure/save_and_load')
const { builders } = require('./common_buileders/builders')
const InitialMessage = require("./initialmessage")





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