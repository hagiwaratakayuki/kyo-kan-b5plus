const { ClassBasicTemplate } = require("../class_basic");
const PIPELINE_LOOP = "pipeline";
class PipeLine extends ClassBasicTemplate {
    /**
     * @type {import("../../../../kyo-kan/protocol").PluginCallbackProtocol}
     */
    async in() {
        return {
            state: "forwardToSub",

            subkey: PIPELINE_LOOP
        }

    }

}

module.exports = { PipeLine, PIPELINE_LOOP }