/**
 * 
 * @typedef {import("../../../../kyo-kan/loopsceinario_configure/configure_type").LoopStepConfigure} LoopStepConfigure
 */

const deepmerge = require("deepmerge");
const { CALCULATE_BUILDER } = require("./consts");

/**
 * 
 * @param {import("./protocol").Formura} formura
 * @param {string} facade  
 */
function scenarioGenerater(formura, facade = CALCULATE_BUILDER) {


    /**
     * @type {LoopStepConfigure}
     */
    const ret = {
        builder: facade,
        options: {},
        subLoops: {}
    }
    const formuraScenario = []
    const targetScenarioPath = []

    let targetScenario = formuraScenario
    targetScenarioPath.push(targetScenario)
    for (const param of formura.params) {
        const options = deepmerge(param, {})
        delete options.formura
    }

}