import type { messagingApi } from "@line/bot-sdk"
import type { StandardizedLoadBlobFunction } from "../../standized_protocol/function_map/load_function"

export type LinePlatform = {
    client: messagingApi.MessagingApiClient
    blobClient: messagingApi.MessagingApiBlobClient
    messageId: string
}
export type LineStandardizedLoadBlobFunction = StandardizedLoadBlobFunction