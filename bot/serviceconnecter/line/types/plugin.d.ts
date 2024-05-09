import type { Message } from "@line/bot-sdk"
import type { webhook, TextEventMessage, } from "@line/bot-sdk"
import type { PlugInProtocol, PluginCallbackProtocol } from "../../../kyo-kan/protocol"
import { LineMessageStateResponse } from "./responsetype"

export type LineRequest = webhook.Event
export type LinePlugInsProtocol<ResponseType = any, RequestType = LineRequest> = PlugInProtocol<LineRequest, ResponseType>
export type LineRequestCallbackProtocol<ResponseType = any, RequestType = LineRequest> = PluginCallbackProtocol<LineRequest, ResponseType>


export type LineMessageResponseCallbackProtocol = LineRequestCallbackProtocol<LineMessageStateResponse>

