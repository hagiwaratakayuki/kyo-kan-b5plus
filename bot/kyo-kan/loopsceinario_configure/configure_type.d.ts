import { SubLoopType } from "../looploader/base_type"

export type PluginConfig<OptionsType = any> = {
    builder: string
    options: OptionsType

}

export type LoopStep<OptionsType = any> = PluginConfig<OptionsType> & {

    subLoops?: {
        [k: string]: {
            type: SubLoopType,
            loopSteps: LoopStep<any>[]
        } | string
    }
    filter: PluginConfig[]
    namedFilters: string[]

}

export type loopScenario<> = {
    type: string
    loopSteps: LoopStep[]


}


export type LoopScenarioConfigure = {
    RootScenario: LoopStep[]
    LoopScenarios?: {
        [name: string]: loopScenario

    }


}

