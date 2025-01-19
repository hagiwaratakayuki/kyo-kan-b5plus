const deepmerge = require("deepmerge");
const { createScenarioGenerater, I18N_SELECT_OPTION_MESSAGE_NAMESPACE } = require("../vpec/controller");
const { selectionConfigurationSynchronaize } = require("../vpec/syncronaizer");
const { PluginSelect: PluginSelect, OPTION_SUBLOOP_NAME } = require("./controller");

/**
 * @type {import("../vpec/controller").scenarioGenerater?}
 */
let _scenarioGenerater = null;

let _buiders = null
const DEFAULT_CONTROLLER_ID = "select.functionselect";
function setPluginSelectBuilderConfig(args = {}) {
    const { controllerId = DEFAULT_CONTROLLER_ID, builderIdMap = {} } = args
    const { builders, builderIdMap: _builderIdMap } = selectionConfigurationSynchronaize(PluginSelect, controllerId, builderIdMap)
    _scenarioGenerater = createScenarioGenerater(controllerId, _builderIdMap)
    _buiders = builders

}

function getPluginSelectBuilder() {
    return _buiders
}
/**
 * 
 * 
*  @param {import("./protocol").Select} selectOptions
 * @param {{[ISOlanguageCode in string]: {title?:string, message:string}}} messageConfig 
 * @param {*} viewConfig 
 * @param {*} parserConfig 
 * @returns 
 */
function getPluginScenarioStep(selectOptions, messageConfig, viewConfig, parserConfig) {

    const i18n = deepmerge({}, messageConfig);
    const selects = []
    /**
     * @type {import("../../../../../kyo-kan/loopsceinario_configure/configure_type").LoopStepConfigure}
     */
    const loopSteps = []
    for (const [key, selectOption] of Object.entries(selectOptions)) {

        selects.push(key)
        loopSteps.push(selectOption)

        for (const [language, texts] of Object.entries(selectOption.i18n)) {
            const targetLanguageMessages = i18n[language] || {}
            const selectSection = targetLanguageMessages[I18N_SELECT_OPTION_MESSAGE_NAMESPACE] || {}
            selectSection[key] = texts.label;
            targetLanguageMessages[I18N_SELECT_OPTION_MESSAGE_NAMESPACE] = selectSection
            i18n[language] = targetLanguageMessages

        }
    }
    const controllerOption = { i18n, selects }
    const ret = _scenarioGenerater(controllerOption, viewConfig, parserConfig)
    ret.subLoops[OPTION_SUBLOOP_NAME] = { type: "selection", loopSteps }
    return ret;

}
setPluginSelectBuilderConfig()// initiarize

module.exports = { getPluginSelectBuilder, setPluginSelectBuilderConfig, getPluginScenarioStep }

