import { State } from "./state_emitter";


export type PlugIn<CallbackType = Function> = Partial<{
    [k in State]: CallbackType
}> & {
    in: CallbackType
}

export type BackTarget = "in" | "latest"
export type Builder<OptionsType = any, PluginType = PlugIn> = (options: OptionsType, language?: string, i18n?: any) => PluginType

export type StateResponse<ResponseType = any> = {
    state?: State
    subid?: number
    subkey?: string
    callback?: string //Funcname Use when state is wait. Default is "wait"
    subLoopInit?: any
    backTarget?: BackTarget
    response?: ResponseType


}
