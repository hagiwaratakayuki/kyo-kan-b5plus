import type { webhook, AudioEventMessage, EventMessage, FileEventMessage, LocationEventMessage, TextEventMessage, VideoEventMessage, messagingApi } from "@line/bot-sdk"
import type { StandardizedRequestBasic, StandardizedRequestBlobBasic, StandardizedRequestFile, StandardizedRequestLocation, StandardizedRequestText, StandardizedRequestVideo, StandardizedRequetAudio, StanderdizedBlobFunction } from "../../types/requestype/basic"

export type LineWebhookRequest = {
    event: webhook.Event
    client: messagingApi.MessagingApiClient
    blobClient: messagingApi.MessagingApiBlobClient
}

export type LineSourceMessage = {
    userId?: string
}

export type LineStandardizedPlatformCommon = EventMessage & LineSourceMessage
export type LineStandardizedRequestCommon = StandardizedRequestBasic<LineStandardizedPlatformCommon>

export type LineStandardizedRequestText = StandardizedRequestText<TextEventMessage & LineSourceMessage>
export type LineStandardizedRequestLocation = StandardizedRequestLocation<LocationEventMessage & LineSourceMessage>



export type LineStandardizedBlobFunction = StanderdizedBlobFunction<Response>

export type LineStandardizedRequestBlobCommon = StandardizedRequestBlobBasic<LineStandardizedPlatformCommon>
export type LineStandardizedRequestAudio = StandardizedRequetAudio<AudioEventMessage & LineSourceMessage>
export type LineStandardizedRequestVideo = StandardizedRequestVideo<VideoEventMessage & LineSourceMessage>
export type LineStandardizedRequestFile = StandardizedRequestFile<FileEventMessage & LineSourceMessage>