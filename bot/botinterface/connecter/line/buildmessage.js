
/**
 * 
 * @param {import('@line/bot-sdk').messagingApi.MessagingApiClient} client 
 * @param {any[]} messages
 * @param {string?} replyToken
 *   
 */
function callMessage(client, messages, replyToken) {
    /**
     * @type {import('@line/bot-sdk').messagingApi.ReplyMessageRequest | import('@line/bot-sdk').messagingApi.PushMessageRequest}
     *  */
    const messageRequest = { messages }
    if (!replyToken === true) {

        return client.pushMessage(messageRequest)
    }
    messageRequest.replyToken = replyToken
    return client.replyMessage(messageRequest)

}