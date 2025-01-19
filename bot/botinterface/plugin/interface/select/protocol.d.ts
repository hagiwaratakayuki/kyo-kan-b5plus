import type { StandardizedSelectionResponseBase } from "../../../standized_protocol/responsetypes/basic"


export type Options = Omit<StandardizedSelectionResponseBase, "responseType"> & {

    selects: [],
    namespace?: string
}
export type SelectResult = {
    selection: string
}

export type Configuration = { options?: any, hooks: any } 