import type { StandizedLoadBlob } from "./blob_class";
import type { StandardizedLoadBlobResponse, StandardizedLoadBlobFunction } from "./load_function"

export type StandardizedLoadBlobKey = "loadBlob"
export type StandardizedLoadBlobType = StandizedLoadBlob

//  becouse request must json seriararizable. blob sometime need  load functon. see bot/kyo-kan/looploader/save_and_load.js
export type StandardizedFunctionMap<BlobFunctionType = StandardizedLoadBlobFunction> = {
    loadBlob: StandardizedLoadBlobType
    i18n: Funtion
};


