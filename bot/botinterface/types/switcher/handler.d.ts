import type { StateController } from "../../../kyo-kan/state_controller"
import type { Switcher } from "../../switcher"

export type SwitchHandlerFunc<ResponseType = any, Args = []> = (...args: Args) => Promise<ResponseType>
export type SwitchHandler<ResponseType = any, Args = []> = { [k: string]: SwitchHandlerFunc<ResponseType, Args> }