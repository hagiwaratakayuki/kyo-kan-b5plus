import { LoopStepIndex } from "./history";
import { State } from "./state_emitter";

export type HistoryRecord = {
    request: any,
    response: any,
    context: any,
    loopStepIndex: LoopStepIndex,
    state: State
}

export type HistoryRecords = HistoryRecord[]