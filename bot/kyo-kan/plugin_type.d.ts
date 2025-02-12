// PluginExecute(in, wait), ScenarioMoveState(returnFromSub, fowardToSub, forwardToSub, break, back, continue,  ) HookSate

export type ExecuteState = "in" | "wait"
export type MoveState = "back" | "break" | "returnFromSub" | "forwardToSub" | "continue" | "forwardOut"
export type State = ExecuteState | MoveState




import { I18n as I18nClass } from "./i18n";
export type i18n = I18nClass
export type i18nPluginOptionValue<MessageType = any> = {
    [ISOLanguageName in string]: MessageType
}
export type i18nInterfaceFunc = (key: string | string[], pluginOptions: i18nPluginOptionValue)
export type i18nFunc = (key: string | string[], language: string, pluginOptions: i18nPluginOptionValue) => string;
export type FunctionMap = {
    [k in string]: any
} & {
    i18n: i18n
}

export type MoveHooks = `on${Capitalize<MoveState>}`

export type PlugIn<CallbackType = Function, HookType = Function> = Partial<{
    [k in State]: CallbackType
}> & Partial<{
    [k in MoveHooks]: HookType
}> & {
    in: CallbackType
}
export type BootHookFunction = (functionMap: FunctionMap) => void;
export type BootPlugin = {
    onFirstBoot?: BootHookFunction,
    onReboot?: BootHookFunction,
    onBoot?: BootHookFunction
}
export type BootPluginStates = keyof BootPlugin;
export type BootBuilder = (options?: any) => BootPlugin;

export type ExistComponents = {
    [k: string]: string
}
export type CommonOptions = {
    existUiComponents?: ExistComponents
    platform?: string


}
export type RelativeLoopType = "now" | "super" | "top"
export type MoveCount = number | "start"
export type BaseOption = {
    i18n: i18nPluginOptionValue
}


export type Builder<OptionsType = BaseOption, CommonOptionsType = CommonOptions, FunctionMapType = any, PluginType = PlugIn> = (options: OptionsType, CommonOptions: CommonOptionsType, language: string, functionMap: FunctionMapType) => PluginType

export type StateResponse<ClientResponseType = any, PluginType = any, subLoopInitType = any> = {
    state?: State
    subid?: number
    subkey?: string
    callback?: keyof PluginType //Funcname Use when state is wait. Default is "wait"
    subLoopInit?: subLoopInitType
    relativeLoopType?: RelativeLoopType
    move?: MoveCount
    isRewindHistry?: boolean
    clientResponse?: ClientResponseType


}

export type BuilderRegistartionDatas = {
    [id: string]: Builder
} 
