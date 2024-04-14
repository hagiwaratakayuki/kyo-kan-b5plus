type excludeFromIndexes = {
    excludeFromIndexes?: true
}

export type PropertyHooksOptions<T> = excludeFromIndexes & {
    defualtValue?: T
}
export type PropertyHooks = excludeFromIndexes & {
    init?: () => any

    onSave?: (value: any) => any
    onLoad?: (value: any) => any

}
export type PropertyHooksMap<T> = {
    [k in keyof T]?: PropertyHooks
}
export type DatastoreEntity<DataType> = {
    key: Key
    data: DataType
    excludeFromIndexs?: string[]
    excludeLargeProperties?: boolean
    method: "insert" | "upsert" | "update"
}
