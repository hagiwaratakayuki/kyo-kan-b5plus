

const { Switcher } = require("../../switcher");
/**
 * @typedef {import("../types/request").LineWebhookRequest} LineWebhookRequest
 */




class LineSwitcher extends Switcher {

    constructor() {


    }
    /**
     * 
     * @param {import("@line/bot-sdk").WebhookRequestBody} request 
     * @param {import("@line/bot-sdk").messagingApi.MessagingApiClient} client
     * @param {import("@line/bot-sdk").messagingApi.MessagingApiBlobClient} blobClient  
     */
    async run(request, client, blobClient) {
        for (const event of request.events) {
            /**
             * @type {LineWebhookRequest}
             */
            const _request = {
                event,
                client,
                blobClient
            }
            await super.run(_request)
        }

    }

    /**
     * @type {LineWebhookRequest}
    */
    getEvent(request) {
        return request.event.type

    }
}

module.exports = { LineSwitcher }