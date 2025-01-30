import { Saver } from "../../../kyo-kan/looploader/save_and_load"
import { FunctionMap } from "../../../kyo-kan/plugin_type"

export type EditerFunctionMap = FunctionMap & {
    saver: Saver
}