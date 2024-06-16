import type { State } from "./state_emitter";


export type PlugIn<CallbackType = Function> = Partial<{
    [k in State]: CallbackType
}> & {
    in: CallbackType
}


export type ExistComponents = {
    [k: string]: string
}
export type CommonOptions = {
    existUiComponents?: ExistComponents
    platform?: string


}
export type BackTarget = "in" | "latest"
export type BaseOption = {
    namespace: string
}

export type Builder<OptionsType = BaseOption, CommonOptionsType = CommonOptions, FunctionMapType = any, PluginType = PlugIn> = (options: OptionsType, CommonOptions: CommonOptionsType, language: string, functionMap: FunctionMapType) => PluginType

export type StateResponse<ClientResponseType = any> = {
    state?: State
    subid?: number
    subkey?: string
    callback?: string //Funcname Use when state is wait. Default is "wait"
    subLoopInit?: any
    backTarget?: BackTarget
    clientResponse?: ClientResponseType


}
