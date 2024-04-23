import { SubLoopType } from "../looploader/base_type"

export type ConfigureNode<OptionsType = any> = {
    builder: string
    options: OptionsType
    subLoops?: {
        [k: string]: {
            type: SubLoopType,
            configures: ConfigureNode<any>[]
        }
    }

}

export type Configure = ConfigureNode[]

