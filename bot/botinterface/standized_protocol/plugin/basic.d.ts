import { Builder } from "../../../kyo-kan/plugin_type"
import type { PlugInBuilderProtocol, PlugInProtocol } from "../../../kyo-kan/protocol"
import type { StandardizedFunctionMap } from "../function_map/basic"



export type StandardizedPlugInBuilderProtocol<OptionsType = any, CommonOptionsType = any, FuntionMapType = StandardizedFunctionMap> = Builder<OptionsType, CommonOptionsType, FunctionMap, PlugInProtocol> 