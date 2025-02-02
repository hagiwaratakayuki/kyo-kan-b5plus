
const { synchronizeBuilderConfiguration: synchronizeConfiguration } = require("../../../pattern/view_parser_exec/syncronaizer");
const { selectParserBuilder } = require("./parser");
const { selectViewBuilder } = require("./view")



const merge = require("deepmerge");


/**
 * @typedef {import("../../../pattern/view_parser_exec/protocol").builderIdMap} builderIdMap
 *  
 */
/**
 * @type {Partial<builderIdMap>}
 */
const defultBuilderIdMap = {
    view: "selct.view",
    parser: "select.parser",


}
function selectionConfigurationSynchronaize(controller, controllerId, builderIdMap = {}) {
    const _builderIdMap = createBuilderIdMap(controllerId, builderIdMap);
    const builders = synchronizeConfiguration(controller, selectViewBuilder, selectParserBuilder, _builderIdMap);
    return { builders, builderIdMap: _builderIdMap }
}
function createBuilderIdMap(controllerId, builderIdMap) {
    /**
     * @type {Partial<builderIdMap>}
    */
    const _builderIdMap = merge(defultBuilderIdMap, builderIdMap)
    _builderIdMap.controller = controllerId
    return _builderIdMap
}
module.exports = { selectionConfigurationSynchronaize, createBuilderIdMap }
