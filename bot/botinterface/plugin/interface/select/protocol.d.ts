export type Options = {
    message: string,
    selects: [],
    namespace?: string
}
export type SelectResult = {
    selection: string
}

export type Configuration = { options?: any, hooks: any } 