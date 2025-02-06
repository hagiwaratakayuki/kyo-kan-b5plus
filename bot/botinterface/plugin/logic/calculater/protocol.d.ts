
export type Target = "LoopData" | "SubLoopData" | "Global" | "Request"
export type Operater = "and" | "or" | "not" | "gt" | "lt" | "eq" | "egt" | "elt" | "plus" | "minus" | "multiplay" | "pow"
export type Param = {

    value?: any
    path?: string
    target?: Target
    formura?: Formura
}
export type Formura<OperaterOptionType = any> = {
    operater?: Operater
    options?: OperaterOptionType
    params: Param[]


}

export type InnerLoopData = {
    results: Array<any>,
    data: any
}

