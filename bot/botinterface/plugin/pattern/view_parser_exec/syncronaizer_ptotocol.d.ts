import { LoopStepConfigure } from "../../../../kyo-kan/loopsceinario_configure/configure_type"

export type builderIdMap = {
    view: string,
    parser: string,
    controller: string
}

export type beforeAfterHook = {
    before: LoopStepConfigure[] | null,
    after: LoopStepConfigure[] | null
}

export type VPEHook = {
    [k in keyof Pick<builderIdMap, "parser" | "view">]: beforeAfterHook | null
}