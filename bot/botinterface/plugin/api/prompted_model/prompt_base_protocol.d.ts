

export type PromptPluginOptions = {
    template: string,
    globalValueKey?: string
    isSaveConversationGlobal?: boolean
    conversationLimit: number


}


export type LoggableCallData<ParamsType = any> = {
    conversation?: any
    params: ParamsType
}