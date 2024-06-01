import { Basic } from "../../bot2bot/connecter/basic";
import { Builder } from "../plugin_type";



export type i18nFunc<T = string> = (key: string, lnaguage: string, options: any) => T

export type Schema = any // json schema
export type ShareValues = string[] // json path for Schema
export type ShareValuesMap = {
    request: ShareValues
    response: ShareValues
    loop: ShareValues
}

export type DocumentLoader {
    title: i18nFunc<string>
    description: i18nFunc<string>
    schema?: Schema
    shareValuesMap?: ShareValuesMap


}

export type Document = Partial<{
    [k in keyof Omit<DocumentLoader, "schema" | "shareValuesMap">]: SelfAndUse
}>

export type BuilderConfig = {
    builder: Builder
    options?: Object // Custamized default option
    mergeFunction?: Function // option merge function default is Object.assign
    documentLoader?: DocumentLoader

}

export type BuilderConfigMap = { [builderID: string]: BuilderConfig }
export type SubLoopType = "selection" | "loop"


export type LoopState<T> = {
    t: string
    stp: T[]


}
export type StepConfig = {
    bID: string
    o: any
}
export type LoopStep = StepConfig & {
    s: any
    filt: any
    p: any

}

export type LoopScenario = LoopStep[]





export type PositionState {
    isEnd: boolean
    isSubLoopEnd: boolean
}
export type LoopStepIndex = any

export type DocumentPropertis = Array<keyof Document>
export type SubLoopDocumentList = { subid: any, document: Document }[]


export type RelativeLoop = "now" | "super" | "top";
export type RelativeLoopMovement = number | "end" | "start"
export type LoopStepIndex = [scenarioId: number, step: number]