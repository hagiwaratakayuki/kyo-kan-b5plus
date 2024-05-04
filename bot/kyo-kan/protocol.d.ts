import { Context } from "./context";
import type { PlugIn, Builder, StateResponse } from "./plugin_type";
import type { StateController } from "./state_controller";



export type PluginCallbackProtocol<ClientResponseType = any> = (request: any, context: Context, stateController: StateController) => StateResponse<ClientResponseType>


export type PlugInProtocol<RequestType, ResponseType = any, RestParameters = []> = PlugIn<PluginCallbackProtocol<RequestType, ResponseType, RestParameters>>
export type PlugInBuilderProtocol<OptionsType = any, CommonOptionType = any, FunctionMapType = any, PluginType = PlugInProtocol<any>> = Builder<OptionsType, CommonOptionsType, PluginType>
