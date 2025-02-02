import { Context } from "../../../../kyo-kan/context"

export type RenderingMode = { mode: "view" | "parse" }
export type FormInputsData<InputsType = any> = { inputs: InputsType }
export type PluginRenderingContext<FormDataType = any> = Context<any, RenderingMode, FormDataType, any>
export type ParseContext = PluginRenderingContext<FormInputsData>