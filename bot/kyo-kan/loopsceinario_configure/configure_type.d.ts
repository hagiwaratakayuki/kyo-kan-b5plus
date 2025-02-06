import { BuilderConfig, SubLoopType } from "../looploader/base_type"

export type PluginConfig<OptionsType = any> = {
    builder: string | BuilderConfig
    options: OptionsType

}


export type LoopStepConfigure<OptionsType = any> = PluginConfig<OptionsType> & {

    subLoops?: {
        [k: string]: {
            type: SubLoopType,
            loopSteps: LoopStepConfigure<any>[]
        } | string
    }


}

export type loopScenario = {
    type: string
    loopSteps: LoopStepConfigure[]


}
export type BuilderScenarioConfig = {
    [builderid in string]: {
        builder: any
        commonOption: any
        scenarioBulder: Function

    }
}

export type LoopScenarioConfigure = {
    RootScenario: LoopStepConfigure[]
    LoopScenarios?: {
        [name: string]: loopScenario

    }


}

