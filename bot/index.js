const line = require('@line/bot-sdk');
const express = require('express')
const { addHours, compareAsc, } = require("date-fns");
const { middleware } = require('@line/bot-sdk')
const { getChannelSecret, getAccessToken } = require('./secret_manager/line/reader')
const { getIsLocal } = require('./util/is_local')
const { LineSwitcher } = require('./serviceconnecter/line/switcher/index')

const CHANNEL_SECRET = getChannelSecret(getIsLocal())
const app = express()
/**
 * @type {import('@line/bot-sdk').MiddlewareConfig}
 */
const config = {
    channelSecret: CHANNEL_SECRET
}
/**
 * @type {{client:any, blobClient:any}}
 */
let _clients = {};
let _cacheTime;
async function getClients() {
    const now = new Date();
    if (!_cacheTime === true || compareAsc(_cacheTime, now) > -1) {
        _cacheTime = addHours(now, 1);
        const accessToken = await getAccessToken();
        const client = new line.messagingApi.MessagingApiClient({
            channelAccessToken: accessToken
        });
        const blobClient = new line.messagingApi.MessagingApiBlobClient({
            channelAccessToken: accessToken
        });
        _clients = { client, blobClient };
    }
    return _clients;

}

app.post('/bot/line/webhook', middleware(config), async (req, res) => {

    const switcher = new LineSwitcher();
    const { client, blobClient } = await getClients();
    await switcher.run(req.body.events, client, blobClient, req.body.destination);

})

app.listen(process.env.PORT || 8080)