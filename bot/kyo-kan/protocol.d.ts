import { Context } from "./context";
import type { PlugIn, Builder, StateResponse } from "./plugin_type";
import type { StateController } from "./state_controller";



export type PluginCallbackProtocol<RequestType, ResponseType = any, RestParameters = []> = (request: RequestType, context: Context, stateController: StateController, ...rest: RestParameters) => StateResponse<ResponseType>


export type PlugInProtocol<RequestType, ResponseType = any, RestParameters = []> = PlugIn<PluginCallbackProtocol<RequestType, RestParameters>>
export type PlugInBuilderProtocol<OptionsType = any, CommonOptionType = any, PluginType = PlugInProtocol<any>> = Builder<OptionsType, CommonOptionsType, PluginType>
