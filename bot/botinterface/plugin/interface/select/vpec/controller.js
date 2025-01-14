const deepmerge = require("deepmerge");


const { ViewParseExecController, VPEUtil } = require("../../../pattern/view_parser_exec/basic");


class BasicSelect extends ViewParseExecController {
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

const scenario = VPEUtil(BasicSelect, [
    { builder: SELECT_VIEW }
], [
    { builder: SELECT_PARSE }
])



module.exports = { scenario }