import type { messagingApi, webhook } from "@line/bot-sdk"

export type LineWebhookRequest = {
    event: webhook.Event
    client: messagingApi.MessagingApiClient
    blobClient: messagingApi.MessagingApiBlobClient
}