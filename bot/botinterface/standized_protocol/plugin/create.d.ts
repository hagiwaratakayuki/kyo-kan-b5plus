import type { Saver } from "../../../kyo-kan/looploader/save_and_load";
import { CommonOptions } from "../../../kyo-kan/plugin_type";
import { StandardizedFunctionMap } from "../function_map/basic";
import { StandardizedPlugInBuilderProtocol } from "./basic";
export type StandardizedCreateFunctionMap = StandardizedFunctionMap & {
    saver: Saver
    getPluginList: Fuction

}
export type StandizedCreatPlungInBuilderProtocol<CommonOptionsType = Common> = StandardizedPlugInBuilderProtocol<>