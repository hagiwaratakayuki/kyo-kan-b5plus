import { Context } from "./context";
import type { PlugIn, Builder, StateResponse } from "./plugin_type";
import type { StateController } from "./state_controller";



export type PluginCallbackProtocol<Request, ResponseType = any, RestParameters = []> = (request: Request, context: Context, stateController: StateController, ...rest: RestParameters) => StateResponse<ResponseType>


export type PlugInProtocol<Request, ResponseType = any, RestParameters = []> = PlugIn<PluginCallbackProtocol<Request, RestParameters>>
export type PlugInBuilderProtocol<OptionsType = any, PluginType = PlugInProtocol<any>> = Builder<OptionsType, PluginType>
