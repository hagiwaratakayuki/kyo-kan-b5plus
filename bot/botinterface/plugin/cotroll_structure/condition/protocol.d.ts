
export type Target = "LoopData" | "SubLoopData" | "Global" | "Request"
export type Operater = "and" | "or" | "not" | "gt" | "lt" | "eq" | "egt" | "elt" | "plus" | "minus" | "multiplay"
export type Condition = {
    operater?: Operater
    value?: any
    path?: string
    target?: Target
    subConditions?: Condition[]


}

