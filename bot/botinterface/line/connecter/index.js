

const { StateController } = require('../../../kyo-kan/state_controller');
const { Basic } = require('../../connecter/basic');
const messageHandlers = require('./handlers')




/**
 * @typedef {{text:import('@line/bot-sdk').messagingApi.MessagingApiClient, blob:import('@line/bot-sdk').messagingApi.MessagingApiBlobClient}} lineClients
* @typedef { import("../../types/responsetypes/basic").Message } message 
* */
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
    async run(request, jsonData, isStart, builderConfigMap, options, functionMap) {

        const replyToken = request.event.replyToken





        /**
         * @type {import('../types/request').LineStandardizedRequestCommon | import("../types/request").LineStandardizedRequestBlobCommon}
         */
        const standardizeRequest = {
            platform: request.event,
            type: request.event.type,
            sourceId: key



        }
        if (request.event.type in ['image', 'video', 'file']) {
            const blob
        }
        const controller = switcher.buildController(builderConfigMap, isStart)


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


}

module.exports = { LineConnector };