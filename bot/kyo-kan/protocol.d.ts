import { Context } from "./context";
import type { PlugIn } from "./plugin_type";
import type { StateController } from "./state_controller";



export type PluginCallbackProtocol<Request, RestParameters = []> = (request: Request, context: Context, stateController: StateController, ...rest: RestParameters)


export type PlugInProtocol<Request, RestParameters = []> = PlugIn<PluginCallbackProtocol<Request, RestParameters>>
