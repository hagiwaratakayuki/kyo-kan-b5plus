type ExcludeFromIndexes = {
    excludeFromIndexes?: true
}

export type PropertyHooksOptions<T> = ExcludeFromIndexes & {
    defualtValue?: T
}
export type PropertyHooks = ExcludeFromIndexes & {
    init?: () => any

    onSave?: (value: any) => any
    onLoad?: (value: any) => any

}
export type PropertyHooksMap<T> = {
    [k in keyof T]?: PropertyHooks
}


export type MinimumEntity<DataType> = {
    key: Key
    data: DataType
}
export type DatastoreEntity<DataType> = MinimumEntity<DataType> & {
    excludeFromIndexs?: string[]
    excludeLargeProperties?: boolean
    method: "insert" | "upsert" | "update"
}
