
const { synchronizeConfiguration } = require("../../../pattern/view_parser_exec/syncronaizer");
const { selectParserBuilder } = require("./parser");
const { selectViewBuilder } = require("./view")
const { VPEUtil } = require("../../../pattern/view_parser_exec/basic");


const merge = require("deepmerge");


/**
 * @typedef {import("../../../pattern/view_parser_exec/syncronaizer_ptotocol").builderIdMap} builderIdMap
 *  
 */
/**
 * @type {Partial<builderIdMap>}
 */
const defultBuilderIdMap = {
    view: "selct.view",
    parser: "select.parser",

}
function selectConfigurationSynchronaize(controller, controllerId, builderIdMap = {}) {
    const _builderIdMap = merge(defultBuilderIdMap, builderIdMap)
    _builderIdMap.controller = controllerId
    return synchronizeConfiguration(controller, selectViewBuilder, selectParserBuilder, builderIdMap);
}

module.exports = { selectConfigurationSynchronaize }
