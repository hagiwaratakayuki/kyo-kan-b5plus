import type { webhook, Message } from "@line/bot-sdk"
import type { PlugInProtocol, PluginCallbackProtocol } from "../../../kyo-kan/protocol"

export type LineRequest = webhook.Event
export type LinePlugIns = PlugInProtocol<LineRequest, Message>
export type LineRequestCallbackProtocol<ResponseType = any> = PlugInProtocol<LineRequest, ResponseType>
export type LineCallbackProtocol = LineRequestCallbackProtocol<Message>