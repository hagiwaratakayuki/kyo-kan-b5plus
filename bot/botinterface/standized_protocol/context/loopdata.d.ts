/**
 * Context Loopdata see bot/kyo-kan/context.js
 */

import { Context } from "../../../kyo-kan/context"


export type StandardizedLoopDataParams<ParamsType = any> = {
    params: ParamsType
}


export type StandardizedLoopDataContext<Data = any, SubLoopData = any, LoopData = Object, GlobalData = any> = Context<Data, SubLoopData, LoopData | StandardizedLoopDataParams, GlobalData>