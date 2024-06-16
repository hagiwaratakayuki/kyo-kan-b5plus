const deepmerge = require("deepmerge");
const { StepControllerClass } = require("../scenario/step_controller");
const { Context } = require("../../../kyo-kan/context");


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

class PlugIn extends StepControllerClass {
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
        response.subLoopInit = {

        }

    }

}