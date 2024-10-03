const { ClassBasicTemplate } = require("../class_basic");
const { InitiaraizeLoop, ExecLoop } = require("./const")
class InitExec extends ClassBasicTemplate {
    /**
     * @type {import("../../../../kyo-kan/protocol").PluginCallbackProtocol}
     */
    async in() {
        return {
            state: "forwardToSub",
            callback: "execute",
            subkey: InitiaraizeLoop
        }

    }
    /**
     * @type {import("../../../../kyo-kan/protocol").PluginCallbackProtocol}
     */
    async execute(request, context, stateController) {

        return {
            state: "forwardToSub",
            subkey: ExecLoop,
            subLoopInit: { init: context.getSubLoopData() }
        }
    }
}

module.exports = { InitExec }