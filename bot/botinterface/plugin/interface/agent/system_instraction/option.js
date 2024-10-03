const { ClassBasicTemplate } = require("../../../../pattern/class_basic");

class OptionLoader extends ClassBasicTemplate {
    /**
     * @type {import("../../../../../../kyo-kan/protocol").PluginCallbackProtocol}
     */
    async in(request, context, stateController) {
        context.setLoopData({ instraction: this.options.prompt })
    }
}