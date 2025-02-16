import { Basic } from "../../bot2bot/connecter/basic";
import { BootBuilder, Builder, i18nFunc } from "../plugin_type";



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

export type BootBuilderConfig = {
    options?: any,
    builder: BootBuilder,
}



export type SubLoopType = "selection" | "loop"


export type LoopState<T> = {
    t: string
    stp: T[]


}
export type LoopStep = {
    bID: string
    o: any
    s: { [k: string]: number }
}

export type LoopScenario = Array<LoopStep>





export type PositionState {
    isEnd: boolean
    isSubLoopEnd: boolean
}


export type DocumentPropertis = Array<keyof Document>
export type SubLoopDocumentList = { subid: any, document: Document }[]


export type RelativeLoop = "now" | "super" | "top";
export type RelativeLoopMovement = number | "end" | "start"
export type LoopStepIndex = [loopScenarioId: number, step: number = -1]