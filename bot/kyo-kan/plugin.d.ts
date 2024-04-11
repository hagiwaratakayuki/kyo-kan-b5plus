import { state } from "./state_emitter";


export type PlugIn = Partial<{
    [k in state]: Function
}> & {
    in: Function
}

export type BackTarget = "in" | "latest"
export type Builder = (options: any, language?: string, i18n?: any) => PlugIn

export type StateResponse = {
    state?: state
    subid?: number
    subkey?: string
    callback?: string //Funcname Use when state is wait. Default is "wait"
    subLoopInit?: any
    backTarget?: BackTarget

}

