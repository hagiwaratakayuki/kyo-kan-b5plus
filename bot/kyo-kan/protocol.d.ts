import { Context } from "./context";
import type { PlugIn, Builder, StateResponse } from "./plugin_type";
import type { StateController } from "./state_controller";


export type PlugInResponseProtocol<ClientResponseType> = Promise<StateResponse<ClientResponseType>>
export type PluginCallbackProtocol<RequestType = any, ClientResponseType = any> = (request: RequestType, context: Context, stateController: StateController) => PlugInResponseProtocol<ClientResponseType>

export type PluginFilterNextProtocol<ClientResponseType> = () => PlugInResponseProtocol<ClientResponseType>
export type PluginFilterProtocol<ClientResponseType = any> = (next: PluginFilterNextProtocol<ClientResponseType>, ...args: Parameters<PluginCallbackProtocol>) => PluginRes
export type PlugInProtocol<RequestType, ResponseType = any, RestParameters = []> = PlugIn<PluginCallbackProtocol<RequestType, ResponseType, RestParameters>>
export type PlugInBuilderProtocol<OptionsType = any, CommonOptionType = any, FunctionMapType = any, PluginType = PlugInProtocol<any>> = Builder<OptionsType, CommonOptionsType, PluginType>
