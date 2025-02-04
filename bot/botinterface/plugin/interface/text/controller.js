
const { VIEW_KEY } = require("../../pattern/view_parser_exec/basic");
const { FormComponentController, createComponentScenarioGenerater } = require("../form/component");

class TextInputController extends FormComponentController {
    /**
     * 
     * @param {*} request 
     * @param {import("../../../../kyo-kan/context").Context<any,import("./protocol").Configuration, any, any>} context 
     * @param {*} stateController 
     */
    in(request, context, stateController) {
        const response = super.in(request, context, stateController);
        if (response.subkey == VIEW_KEY) {
            /**
             * @type {import("./protocol").Configuration}
             */
            const subLoopInit = response.subLoopInit
            subLoopInit.isTextArea = this.options.isTextArea || false;
            const placeHolder = this.functionMap.i18n.getMessage('placeHolder', this.options)
            if (!placeHolder == false) {
                subLoopInit.placeHolder = placeHolder;

            }
        }
        return response;
    }
}
module.exports = { TextInputController }



