export type responseType = "message" | "YN" | "selection" | "question"

export type Message<T = responseType> = {
    text?: string
    responseType?: T
    selectOptions?: any[]

}
export type Messages<T = responseType> = Message<T>[];

export type CallbackMessage = {
    YN?: boolean
    answer?: string
    selection?: any
}