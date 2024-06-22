const { selectViewBuilder, selectParserBuilder } = require("../botinterface/plugin/interface/execute/select_view");



/**
 * @type {import("../kyo-kan/looploader/base_type").BuilderConfigMap}
 *  
 */
const builders = {
    "select.view": {
        builder: selectViewBuilder
    },
    "select.parse": {
        builder: selectParserBuilder
    }

}