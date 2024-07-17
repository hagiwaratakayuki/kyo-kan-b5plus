const deepmerge = require("deepmerge");


const { StepControllerClass, VPEUtil: MVCUtil } = require("../botinterface/plugin/pattern/view_parse_exec");
const { ClassConstructBuilder } = require("../botinterface/plugin/utility/classconstructbuilder");

/**
 * @typedef {Import("../kyo-kan/context").Context} Context
 */

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
        super(deepmerge(defaultOptions || {}, options || {}), commonOptions, language, funcMap)
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

const scenario = MVCUtil(ClassConstructBuilder(InitialMessage), [
    { builder: "select.view" }
], [
    { builder: "select.parse" }
])



module.exports = { scenario }