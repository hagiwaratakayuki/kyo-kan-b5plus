const { selectViewBuilder, selectParserBuilder } = require("../../botinterface/plugin/interface/select/view/execute");

const SELECT_VIEW = "select.view"
const SELECT_PARSE = "select.parse"

/**
 * @type {import("../../kyo-kan/looploader/base_type").BuilderConfigMap}
 *  
 */
const builders = {}
builders[SELECT_VIEW] = {
    builder: selectViewBuilder
}
builders[SELECT_PARSE] = {
    builder: selectParserBuilder
}

module.exports = { builders, SELECT_PARSE, SELECT_VIEW }