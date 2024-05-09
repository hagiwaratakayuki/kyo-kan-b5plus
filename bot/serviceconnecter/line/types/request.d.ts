import type { webhook, AudioEventMessage, EventMessage, FileEventMessage, LocationEventMessage, TextEventMessage, VideoEventMessage, messagingApi } from "@line/bot-sdk"
import type { StandardizedBlobLoadResponse as StandardizedBlobLoadResponse, StandardizedRequestBasic, StandardizedRequestBlobBasic, StandardizedRequestFile, StandardizedRequestLocation, StandardizedRequestText, StandardizedRequestVideo, StandardizedRequetAudio } from "../../../botinterface/standized_protocol/requestype/basic"
import type { StandardizedFunctionMap, StanderdizedBlobFunction } from "../../../botinterface/standized_protocol/function_map/basic"

export type LineWebhookRequest = {
    event: webhook.Event
    client: messagingApi.MessagingApiClient
    blobClient: messagingApi.MessagingApiBlobClient
}



export type LineStandardizedPlatformCommon = webhook.Event
export type LineStandardizedRequestCommon = StandardizedRequestBasic<LineStandardizedPlatformCommon>

export type LineStandardizedRequestText = StandardizedRequestText<TextEventMessage>
export type LineStandardizedRequestLocation = StandardizedRequestLocation<LocationEventMessage>


export type LineStandardizedRequestBlobCommon = StandardizedRequestBlobBasic<LineStandardizedPlatformCommon>
export type LineStandardizedRequestAudio = StandardizedRequetAudio<AudioEventMessage>
export type LineStandardizedRequestVideo = StandardizedRequestVideo<VideoEventMessage>
export type LineStandardizedRequestFile = StandardizedRequestFile<FileEventMessage>

export type LineStandardizedBlobFunction = StanderdizedBlobFunction

export type LineStandardizedBlobLoadResponse = StandardizedBlobLoadResponse
export type LineStandardizedFunctionMap = StandardizedFunctionMap<LineStandardizedBlobFunction> 