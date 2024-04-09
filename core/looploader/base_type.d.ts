import { Basic } from "../../bot2bot/connecter/basic";
import { Builder, PlugIn } from "../plugin";



export type i18nFunc<T = string> = (language: string, options: any) => T

export type Schema = {
    uri: string,
    descriptions: any // recursive dictionaly like {a:{b:{c:"that"}}}
    definitions: any// recursive dictionaly like {a:{b:{c:"that"}}}
}

export type SchemaMap = {
    loopData: Schema
}

export type DocumentLoader {
    title: i18nFunc
    description: i18nFunc
    schema?: i18nFunc<SchemaMap>


}

export type Document = Partial<{
    [k in keyof DocumentLoader]: string
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
export type LoopStep = {
    bID: string
    o: any
    s: Record<string, LoopState<LoopStep>>

}





export type PositionState {
    isEnd: boolean
    isSubLoopEnd: boolean
}
export type LoopStepIndex = any

export type DocumentPropertis = Array<keyof Document>
export type SubLoopDocumentList = { subid: any, document: Document }[]


export type RelativeLoop = "now" | "super" | "top";
export type RelativeLoopMovement = number | "end" | "start"
export interface BasicLoader {


    positionState: PositionState
    resetPosition(): void
    getStepIndex(): LoopStepIndex
    setStepIndex(loopStepIndex: LoopStepIndex): void
    forward(): PlugIn
    back(): PlugIn
    backAll(): PlugIn
    isIndexEqual(indexA: LoopStepIndex, indexB: LoopStepIndex): boolean

    forwardToSub(subid?: any,): PlugIn
    getNow(): PlugIn
    buildStep(loopStep: LoopStep): PlugIn
    getStartStep(): PlugIn[]
    getSubLoopDocuments(language: string, filter?: DocumentPropertis): SubLoopDocumentList
    getSubLoopDocument(subid: any, language: string, filter?: DocumentPropertis): Document
    isTopLoop(): boolean
    getSubKey(): any
    getRelativePosition(loop: RelativeLoop, move: RelativeLoopMovement): any




}


