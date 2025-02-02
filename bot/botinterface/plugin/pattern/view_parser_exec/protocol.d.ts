import type { Context } from "../../../../kyo-kan/context"
import { LoopStepConfigure } from "../../../../kyo-kan/loopsceinario_configure/configure_type"
import { RenderingMode } from "../../interface/form/protocol"

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
export type VPEFunctionMap = {
    isStepPlatform: () => boolean
}
export type VPEContext = Context<any, any, RenderingMode, any>
export type VPEOptions = { isSingle?: boolean }