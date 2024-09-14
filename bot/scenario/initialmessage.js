const deepmerge = require("deepmerge");


const { ViewParseExecTemplate, VPEUtil } = require("../botinterface/plugin/pattern/view_parse_exec");
const { SELECT_VIEW, SELECT_PARSE } = require("./common_buileders/selection");

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
        ja: {
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

class InitialMessage extends ViewParseExecTemplate {
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
        const i18nFunc = this.functionMap.i18n('options');
        const subLoopInit = { message: i18nFunc('message', this.language, this.options) }
        subLoopInit.options = {}
        for (const key of Object.keys(functionNames)) {
            subLoopInit.options[key] = i18nFunc('select.' + key, this.language, this.options)

        }
        response.subLoopInit = subLoopInit
        return response

    }

}

const scenario = VPEUtil(InitialMessage, [
    { builder: SELECT_VIEW }
], [
    { builder: SELECT_PARSE }
])



module.exports = { scenario }