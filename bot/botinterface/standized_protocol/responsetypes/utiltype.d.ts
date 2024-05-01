export type ConnectorHooks<KeyTypes, CallbackType = Function> = {
    [k in KeyTypes]: CallbackType
}