import type { RespnseMessageHandler } from "./handler_class"

export RespnseMessageHandler
export type RespnseMessageHandlerType<ResponseType = any, ReturnType = any, ResponseTypeT = any> = {
    responseType: ResponseTypeT
    exec(response: ResponseType) => ReturnType

}
