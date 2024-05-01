

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
        /**
         * @type {import('../types/request').LineStandardizedRequestCommon}
         */
        let standardizeRequest = {
            platform: request.event,
            type: request.event.message.type,




        }





        const messages = await this._run(request, resumeData, builderConfigMap, isStart, '', options, _functionMap);
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



}

module.exports = { LineConnector };