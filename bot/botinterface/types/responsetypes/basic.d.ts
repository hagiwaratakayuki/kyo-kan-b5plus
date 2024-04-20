export type BaseResponse<ResponseType> = {
    text?: string
    responsType: ResponseType
}
export type SelectOptionBase<ValueType = string> = {
    text: string
    value: ValueType


}

export type ResponseTypeSelection = "selection"
export type ResponseTypeYN = "YN"
export type SelectionResponseBase<ResponseType, SelectOptionType = SelectOptionBase> = BaseResponse<ResponseType> & {

    options: SelectOptionType[]

}
export type SelectionResponse = SelectionResponseBase<SelectOptionType = SelectOption > & {
    isMultiple?: boolean
}
export type SelectionResponseYN<SelectOptionType = SelectOptionBase> = SelectOptionBase<ResponseTypeYN>







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