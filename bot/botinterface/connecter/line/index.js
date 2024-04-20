
const { messagingApi } = require('@line/bot-sdk');
const { Basic } = require('../basic');
const messageHooks = require('./hooks')




/**
 * @typedef {{text:import('@line/bot-sdk').messagingApi.MessagingApiClient, blob:import('@line/bot-sdk').messagingApi.MessagingApiBlobClient}} lineClients
* @typedef { import("../../types/responsetypes/basic").Message } message 
* */
class LineConnector extends Basic {
    hooks = messageHooks
    /**
     * 
     * @param {*} controller 
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
     * @param {*} request 
     * @param {any} resumeData 
     * @param {*} replyToken 
     */
    async run(request, resumeData, lineClient) {

        const messages = await this._run(request, resumeData, []);
        if (this.controller.isEnd()) {
            this.close()
        }


    }
    close() {

    }
    /**
     * 
     * @param {import("../../types/responsetypes/basic").Message} message
     * @param {any[]} result  
     */
    async _call(message, result) {
        if (message?.responseType) {
            result.push(await this.hooks[message.responseType](message))
        }
        return result
    }


}

module.exports = { Connector };