const Handlebars = require("handlebars");
const { ClassBasicTemplate } = require("../../pattern/class_basic");







/**
 * @typedef {import("../../../standized_protocol/context/loopdata").StandardizedLoopDataContext<any, any, any, any>} Context
 */




/**
 * @typedef {import("./prompt_base_protocol").PromptPluginOptions} PromptPluginOptions
 * 
 * 
 */
class PromptTemplate extends ClassBasicTemplate {
    /** 
     * trait like
     * @type {Function}
     * 
    */
    _caller = () => { }
    /**
     * @type {PromptPluginOptions}
     */
    options = {}
    _dataKey = 'data'
    _renderPrompt(params) {
        const template = Handlebars.compile(this.options.template)
        return template(params)

    }
    _callPromptedModel(calldata, request, context, stateController) {
        return this._caller.call(this, calldata, request, context, stateController)
    }
    _getCallData(request, context, stateController) {

        const params = this._getParams(request, context, stateController)
        const prompt = this._renderPrompt(params)
        return { prompt, params }
    }
    /**
     * 
     * @param {*} requst 
     * @param {Context} context 
     * @param {*} stateController 
     */
    _getConversation(requst, context, stateController) {
        let ret;
        if (!this.options.globalValueKey === false) {
            ret = context.getGlobalData()[this.options.globalValueKey] || []
        }
        else {
            ret = context.getData()[this._dataKey] || []
        }
    }
    /**
     * 
     * @param {*} requst 
     * @param {Context} context 
     * @param {*} stateController 
     */
    _getConversation(requst, context, stateController) {
        let ret;
        if (!this.options.globalValueKey === false) {
            ret = context.getGlobalData()[this.options.globalValueKey] || []
        }
        else {
            ret = context.getData()[this._dataKey] || []
        }
        return ret
    }
    /**
     * 
     * @param {*} requst 
     * @param {Context} context 
     * @param {*} stateController 
     */
    _setConversation(requst, context, stateController) {
        let ret;
        if (!this.options.globalValueKey === false) {
            ret = context.getGlobalData()[this.options.globalValueKey] || []
        }
        else {
            ret = context.getData()[this._dataKey] || []
        }
        return ret
    }
}




module.exports = { SigleCallBase, ChatSubLoopBase: ConversationBase, PromptTemplate, SingleCallOptions }