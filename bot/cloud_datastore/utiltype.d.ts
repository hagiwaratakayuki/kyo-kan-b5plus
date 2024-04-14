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
export type PropertyHooksMarked = PropertyHooks & {
    isHook: true
}

