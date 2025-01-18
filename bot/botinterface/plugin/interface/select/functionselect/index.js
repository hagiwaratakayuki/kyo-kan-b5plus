const { createScenarioGenerater } = require("../vpec/controller");
const { selectionConfigurationSynchronaize } = require("../vpec/syncronaizer");
const { FunctionSelect } = require("./controller");

/**
 * @type {import("../vpec/controller").scenarioGenerater?}
 */
let _scenarioGenerater = null;

let _buiders = null
const DEFAULT_CONTROLLER_ID = "select.functionselect";
function setFuctionSelectBuilderConfig(args = {}) {
    const { controllerId = DEFAULT_CONTROLLER_ID, builderIdMap = {} } = args
    const { builders, builderIdMap: _builderIdMap } = selectionConfigurationSynchronaize(FunctionSelect, controllerId, builderIdMap)
    _scenarioGenerater = createScenarioGenerater(controllerId, _builderIdMap)
    _buiders = builders

}

function getFunctionSelectBuilder() {
    return _buiders
}
function getScenarioStep(i18n, selects, viewConfig, parserConfig) {
    const controllerOption = { i18n, selects }
    return _scenarioGenerater(controllerOption, viewConfig, parserConfig)

}
setFuctionSelectBuilderConfig()// initiarize

module.exports = { getFunctionSelectBuilder, setFuctionSelectBuilderConfig, getScenarioStep }

