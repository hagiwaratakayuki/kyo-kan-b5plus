const { ClassBasicTemplate } = require("../class_basic");
const { InitiaraizeLoop, ExecLoop } = require("./const")
class InitExec extends ClassBasicTemplate {
    /**
     * @type {import("../../../../kyo-kan/protocol").PluginCallbackProtocol}
     */
    async in() {
        return {
            callback: "execute",
            subkey: InitiaraizeLoop
        }

    }
    /**
     * @type {import("../../../../kyo-kan/protocol").PluginCallbackProtocol}
     */
    async execute() {
        return {
            subkey: ExecLoop
        }
    }
}

module.exports = { InitExec }