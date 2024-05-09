

const { Switcher } = require("../../switcher");
const { Handlers } = require("./handler")



class LineSwitcher extends Switcher {
    constructor() {
        this.handlerClasses = Handlers
    }

    /**
     * 
     * @param {import("@line/bot-sdk").WebhookRequestBody} request 
     * @param {import("@line/bot-sdk").messagingApi.MessagingApiClient} client
     * @param {import("@line/bot-sdk").messagingApi.MessagingApiBlobClient} blobClient  
     */
    async run(request, client, blobClient) {
        const proms = []
        for (const event of request.events) {
            /**
             * @type {import("../types/request").LineWebhookRequest}
             */
            const _request = {
                event,
                client,
                blobClient
            }
            proms.push(super.run(_request))
        }
        return await Promise.all(proms)

    }

    /**
     * @type {LineWebhookRequest}
    */
    getEvent(request) {
        return request.event.type

    }
}

module.exports = { LineSwitcher }