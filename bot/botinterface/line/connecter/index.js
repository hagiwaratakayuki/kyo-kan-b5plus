

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
     * @param { import('../../../kyo-kan/state_controller').StateController} StateController 
     * @param {lineClients} lineClients
     * @param {string?} replyToken  
     */
    constructor(controller, lineClients, replyToken) {
        super(controller)
        /**
         * @type {}
         */
        this._lineClients = lineClients
        this._replyToken = replyToken
    }

    /**
     * 
     * @param {import('../types/request').LineWebhookRequest} request 
    */
    async run(request) {

        const replyToken = request.event
        const builderConfigMap = {}
        const [key, userId] = getIdFromEvent(request.event)
        const [isStart, loopScenario] = getLoopScenario(key)// todo

        /**
         * @type {import("../../types/request").LineStandardizedPlatformCommon}
         */
        const platform = {
            userId: userId
        }
        /**
         * @type {import("../../types/request").LineStandardizedRequestCommon | import("../../types/request").LineStandardizedRequestBlobCommon}
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
        const replyToken = request.event.replyToken

        /**
         * @type {LineConnector}
         */
        const connecter = new LineConnector(controller, request, replyToken)



        const messages = await this._run(request, resumeData, []);
        if (this.controller.isEnd()) {
            this.close()
        }


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