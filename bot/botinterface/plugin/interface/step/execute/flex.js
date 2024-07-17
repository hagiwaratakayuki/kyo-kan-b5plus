const { Context } = require();
const { Step } = require("./base");
/**
 * @typedef {import("../../../../../kyo-kan/context").Context} 
 * @typedef {import("../../../../../kyo-kan/protocol").PluginCallbackProtocol} Callback
 */

/**
 * 前のプラグイン(複数)で対象を生成
 * ここでは分割した対象に操作を施すだけ
 * 
 */
class FlexStep extends Step {
    /**
     * @type {Callback}
     */
    async in(request, context, stateController) {
        const steps = (context.getLoopData() || {})[this.options.key || "steps"]
        context.setData(steps)
        this._moveTo(0, context)
        return this._createSelect(context)


    }

    /**
     * 
     * @returns {import("../../../../../kyo-kan/state_controller").StateResponse} 
     */
    _createMainview(context, now) {
        const my = this;
        const subLoopInit = {
            options: (context.getData() || []).filter(function (r) {
                return r[my.options.titles]
            }),



        }
        if (my.options.message) {
            subLoopInit.message = my.options.message

        }
        if (my.options.title) {

            subLoopInit.title = my.options.title

        }
        subLoopInit.edit
        return {
            state: "forwardToSub",
            subkey: this.options.viewWait || "view",
            subLoopInit,
            callback: "waitResponse"
        }

    }
    /**
     * @type {Callback}
     */
    async wait() {

        return {
            state: "wait",
            callback: "parse"
        }
    }

    /**
     * @type {Callback}
     */
    async parse(request, context, stateController) {
        return {
            state: "forwardToSub",
            subkey: "parse",
            callback: "step",

        }
    }
    /**
     * @type {Callback}
     */
    async step(request, context, stateController) {
        const _subLoopData = context.getSubLoopData() || {}
        if ("select" in _subLoopData) {
            const select = _subLoopData.select

        }

    }

    /**
     * @type {Callback}
     */
    async exec(request, context, stateController) {

    }






}