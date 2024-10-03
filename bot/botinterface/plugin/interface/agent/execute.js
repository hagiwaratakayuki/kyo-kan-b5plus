const { ClassBasicTemplate } = require("../../pattern/class_basic");




/**
 * @typedef {import("../../../../kyo-kan/plugin_type").StateResponse} StateResponse
 */
class Plugin extends ClassBasicTemplate {
    /**
     * @type {string}
     */
    options
    /**
     * @type {import("../../../../kyo-kan/protocol").PluginCallbackProtocol<any, any>}
     */
    async in(request, context, stateController) {

        return {
            subkey: this.options.propt
        }

    }
}