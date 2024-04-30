

const { StateController } = require('../../../kyo-kan/state_controller');
const { Basic } = require('../../connecter/basic');
const { getFunctionMap } = require('../functionmap');

const messageHandlers = require('./handlers')





class LineConnector extends Basic {
    handlers = messageHandlers

    /**
     * 
     * @param {import('../types/request').LineWebhookRequest} request
     * @param {*} jsonData
     * @param {boolean} isStart
     * @param {import('../../../kyo-kan/looploader/base_type').BuilderConfigMap} builderConfigMap
     * @param {import('../../../kyo-kan/plugin_type').CommonOptions} options
     * @param {*} functionMap       
    */
    async run(request, jsonData, isStart, builderConfigMap, options = {}, functionMap = {}) {

        const replyToken = request.event.replyToken;
        /**
         * @type {import('@line/bot-sdk').EventMessage}
         */
        const message = request.event.message

        /**
         * @type {import('../functionmap/common_types').LinePlatform}
         */
        const _platform = {
            client: request.client,
            blobClient: request.blobClient,
            messageId: message.id
        }
        const _functionMap = Object.assign({}, getFunctionMap(_platform), options)
        const standardizeRequest





        /**
         * @type {import('../types/request').LineStandardizedRequestCommon | import("../types/request").LineStandardizedRequestBlobCommon}
         */
        const standardizeRequest = {
            platform: request.event,
            type: message.type,




        }
        if (message.type == "text") {
            standardizeRequest.text = message.text
        }

        const controller = new StateController


        /**
         * @type {LineConnector}
         */
        const connecter = new LineConnector()



        const messages = await this._run(request, resumeData, []);
        if (this.controller.isEnd()) {
            this.close()
        }
        return messages


    }
    close() {

    }
    /**
     * 
     * @param {import("../../types/responsetypes/basic").BaseStateResponse} message
     * @param {any[]} result  
     */
    async _call(message, result) {
        if (message?.response?.responsType) {
            result.push(await this.handlers[message.response.responsType](response))
        }
        return result
    }
    parseMessage(event) {

    }


}

module.exports = { LineConnector };