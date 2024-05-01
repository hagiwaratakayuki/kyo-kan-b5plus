

const { StateController } = require('../../../kyo-kan/state_controller');
const { Basic } = require('../../connecter/basic');
const { getFunctionMap } = require('../functionmap');

const messageHandlers = require('./handlers')





class LineBasicConnector extends Basic {
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
        this.replyToken = replyToken
        this.client = request.client

        /**
         * @type {import('../types/function_map').LinePlatform}
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
        standardizeRequest = Object.assign(standardizeRequest, this.parseEvent(request.event))





        const [messages, isEnd] = await this._run(standardizeRequest, resumeData, builderConfigMap, isStart, '', options, _functionMap);
        if (isEnd) {
            this.close()
        }
        return messages


    }
    close() {

    }
    async _processMessages(messages) {
        const lineMessages = await super._processMessages(messages)
        await this.sendMessage(lineMessages)
        return messages

    }
    /**
     * 
     * @param {import('@line/bot-sdk').messagingApi.MessagingApiClient} client 
     * @param {any[]} lineMessages
     * 
     *   
     */
    sendMessage(lineMessages) {
        /**
         * @type {import('@line/bot-sdk').messagingApi.ReplyMessageRequest | import('@line/bot-sdk').messagingApi.PushMessageRequest}
         *  */
        const messageRequest = { messages: lineMessages }
        const replyToken = this.replyToken
        if (!replyToken === true) {

            return client.pushMessage(messageRequest)
        }
        messageRequest.replyToken = replyToken
        return client.replyMessage(messageRequest)

    }



}

module.exports = { LineBasicConnector };