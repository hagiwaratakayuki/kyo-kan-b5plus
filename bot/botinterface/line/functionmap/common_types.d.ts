import type { messagingApi } from "@line/bot-sdk"
import { StandardizedFunctionMap } from "../../types/requestype/basic"

export type LinePlatform = {
    client: messagingApi.MessagingApiClient
    blobClient: messagingApi.MessagingApiBlobClient
    messageId: string
}
export type LineFunctionMapPlatform = {
    _linePlatform: LinePlatform
}
export type LineFunctionMap = StandardizedFunctionMap & LineFunctionMapPlatform