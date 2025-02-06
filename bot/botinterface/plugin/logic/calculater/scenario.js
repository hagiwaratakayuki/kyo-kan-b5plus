/**
 * 
 * @typedef {import("../../../../kyo-kan/loopsceinario_configure/configure_type").LoopStepConfigure} LoopStepConfigure
 */

const deepmerge = require("deepmerge");
const { CALCULATE_BUILDER } = require("./consts");
const { logicBuilders } = require("./builders");

/**
 * 
 * @param {import("./protocol").Formura} formura
 * @param {Function} facadeGenerater  
 */
function scenarioGenerater(formura, facadeGenerater = CALCULATE_BUILDER) {


    /**
     * @type {LoopStepConfigure}
     */
    const [ret, formuras2subLoopArray] = facadeGenerater(formura)
    const formuraScenario = []
    const targetScenarioPath = []

    let targetScenario = formuraScenario
    targetScenarioPath.push(targetScenario)
    /**
     * @type {[import("./protocol").Formura, LoopStepConfigure][]}
     */
    let formuras = [].concat(formuras2subLoopArray)

    while (formuras.length > 0) {
        /**
         * @type {[import("./protocol").Formura, LoopStepConfigure[]]}
         */
        const [targetFormura, targetSubloop] = formuras.pop()
        const scenarioGenerater = logicBuilders[targetFormura.operater]
        const [loopStepConfigure, formuras2subLoopArray] = scenarioGenerater(targetFormura, targetScenario)
        targetSubloop.push(loopStepConfigure)
        if (formuras2subLoopArray) {
            formuras = formuras.concat(formuras2subLoopArray)
        }



    }



}

function formuraToscenario