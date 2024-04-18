const express = require('express')
const { middleware, messagingApi } = require('@line/bot-sdk')
const { getChannelSecret } = require('./secret_manager/line/reader')
const { getIsLocal } = require('./util/is_local')

const CHANNEL_SECRET = getChannelSecret(getIsLocal())
const app = express()
/**
 * @type {import('@line/bot-sdk').MiddlewareConfig}
 */
const config = {
    channelSecret: CHANNEL_SECRET
}

app.post('/bot/line/webhook', middleware(config), (req, res) => {
    req.body.events // webhook event objects from LINE Platform
    req.body.destination // user ID of the bot

})

app.listen(process.env.PORT || 8080)