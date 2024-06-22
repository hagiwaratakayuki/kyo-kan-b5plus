const deepmerge = require("deepmerge");

const { Context } = require("../../../kyo-kan/context");
const { StepControllerClass, EXEC_KEY, RENDERER_KEY } = require("../botinterface/plugin/scenario/step_controller");


/**
 * @typedef {"develop" | "search" | "execute" | "edit"} FunctionName
 */
/**
 * @type {FunctionName[]}
 */
const functionNames = ["develop", "edit", "execute", "search"]


const defaultOptions = {
    i18n: {
        jp: {
            message: "やりたいことを選んでください",
            select: {
                develop: "ボットを作る",
                search: "ボットを探す",
                execute: "開発したbotを使う",
                edit: "開発したbotを編集する"

            }
        },


    }
}

class InitialMessage extends StepControllerClass {
    /**
     * 
     * @param {*} options 
     * @param {*} commonOptions 
     * @param {*} language 
     * @param {import("../../standized_protocol/function_map/basic").StandardizedFunctionMap} funcMap 
     */
    constructor(options, commonOptions, language, funcMap) {
        super(deepmerge(defaultOptions, options), commonOptions, language, funcMap)
    }
    /**
     * 
     * @param {*} request 
     * @param {Context} context 
     * @param {*} stateController 
     */
    in(request, context, stateController) {

        const response = super.in(request, context, stateController)
        const subLoopInit = { message: this.functionMap.i18n('message', this.language) }
        subLoopInit.select = {}
        for (const key of Object.keys(functionNames)) {
            subLoopInit.select[key] = this.functionMap.i18n('select.' + key, this.language, this.options)

        }
        response.subLoopInit = subLoopInit
        return response

    }

}
const name = "initialMessage"
/**
 * @type {import("../kyo-kan/looploader/base_type").BuilderConfig}
 */
const buildr = {
    builder: function (options, commonOptions, language, funcMap) {
        return new InitialMessage(options, commonOptions, language, funcMap)
    }
}
/**
 * @type {import("../kyo-kan/loopsceinario_configure/configure_type").LoopStep}
 */
const scenario = {
    builder: name,
    subLoops: {

    }
}




scenario.subLoops[RENDERER_KEY] = {
    type: "loop",
    loopSteps: [
        {
            builder: "select.view"
        }
    ]
}

scenario.subLoops[EXEC_KEY] = {
    type: "loop",
    loopSteps: [
        {
            builder: "select.parse"
        }
    ]
}

module.exports = { name, buildr, scenario }