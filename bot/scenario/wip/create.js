const { ClassBasicTemplate } = require("../../botinterface/plugin/pattern/class_basic");
/**
 * @typedef {"product" | "negative" | "positive"} Mode
 */
/**
 * @type {Mode}
 */
let MODE = "product"



class CreateWip extends ClassBasicTemplate {
    /**
     * 
     * @param {*} request 
     * @param {*} context 
     * @param {*} stateController 
     * @returns {import("../../botinterface/standized_protocol/responsetypes/basic").StandardizedMessageStateResponse}
     */
    in(request, context, stateController) {
        return {
            state: "wait",
            callback: "checkRequest",
            clientResponse: {
                responseType: "message",
                message: "どんなbotを作りたいですか?"
            }
        }

    }
    /**
     * 
     * @param {import("../../botinterface/standized_protocol/requestype/basic.js").StandardizedRequestTypeText} request 
     * @param {import("../../kyo-kan/context.js").Context} context 
     * @param {*} stateController 
     */
    checkRequest(request, context, stateController) {
        let isAskAgain = false;
        let message = ""

        if (MODE == "negative") {
            isAskAgain == true

        }
        if (MODE == "positive") {
            isAskAgain == false
        }

        if (isAskAgain) {
            message = "もう少し詳しく教えてください"
            context.setData()
            /**
             * @type {import("../../botinterface/standized_protocol/responsetypes/basic").StandardizedMessageStateResponse<CreateWip, any>}
             */
            const ret = {
                state: "wait",
                callback: "checkAskAgain",
                clientResponse: {
                    responseType: "message",
                    message,
                }

            }
        }
        else {

        }
    }
    checkAskAgain() {

    }


}
/**
 * 
 * @param {Mode} mode 
 */
function setMode(mode) {
    MODE = mode;

}