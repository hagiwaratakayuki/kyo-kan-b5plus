const Handlebars = require("handlebars");
const { ClassBase } = require("../../utility/clsbase");
const { Context } = require("../../../../kyo-kan/context");

const TEMLATE_KEY = "template"
const PARAMS_KEY = "params"
const LOGS_KEY = "logs"



const DEFAULT_PROMPT_OPTIONS = {
    templateKey: TEMLATE_KEY

}


/**
 * @typedef {Partial<typeof DEFAULT_PROMPT_OPTIONS>} BasicPromptOptions
 * @typedef {BasicPromptOptions & {template:string}} DefultPromptOptions
 * @typedef {{paramsKey:string?}} SingleCallOptions
 * @typedef {{[k in typeof PARAMS_KEY]: any}} DefaultSingleParam
 * @typedef {DefaultSingleParam & {logs:any}} DefaultLogsParam
 * @type {SingleCallOptions}
 */
let DEFAULT_OPTIONS_SINGLECALL = {
    paramsKey: PARAMS_KEY
}
/**
 * @typedef {DEFAULT_OPTIONS_SINGLECALL & {logsKey:string?}} ChatOptions
 * @type {ChatOptions}
 */
const DEFAULT_OPTIONS_CHAT = {
    logs: LOGS_KEY
}

/**
 * 
 * @typedef {DEFAULT_OPTIONS_CHAT} PromptTemplate
 * @typedef {PromptTemplateParam & {[k in PARAMS_KEY]:string}} SingleCallParam
 */


class PromptTemplate extends ClassBase {

    _renderPrompt(params) {
        const template = Handlebars.compile(this.options[this.templateKey || "template"])
        return template(params)

    }

}

class SigleCallBase extends PromptTemplate {
    /**
     * 
     * @param {*} request 
     * @param {Context} context 
     * @param {*} stateController 
     */
    async in(request, context, stateController) {

        const datas = this._getData(params)
        return this._callLLM(datas)
    }
    _getData(request, context, stateController) {

        const params = this._getParams(request, context, stateController)
        const prompt = this._renderPrompt(params)
        return prompt
    }
    _getParams(request, context, stateController) {
        return (context.getLoopData() || {})[this.options.paramsKey || "params"]

    }
    _callLLM(params) {

    }
}



class ChatSubLoopBase extends SigleCallBase {

    _getData(request, context, stateController) {
        const prompt = super._getData(request, context, stateController)
        const logs = (context.getLoopData() || {})[this.options.logKey || "log"] || {}
        return { prompt, logs }

    }

}