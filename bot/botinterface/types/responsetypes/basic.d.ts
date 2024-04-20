import type { StateResponse } from "../../../kyo-kan/plugin";
export type BaseResponse<ResponseType> = {
    title?: string
    description?: string
    responsType: ResponseType
}
export type BaseStateResponse<ResponseType = any> = StateResponse<BaseResponse<ResponseType>>


export type SelectOptionBase<ValueType = string> = {
    label: string
    value: ValueType


}

export type ResponseTypeSelection = "selection"
export type ResponseTypeYN = "YN"
export type SelectionResponseBase<ResponseType, SelectOptionType = SelectOptionBase> = BaseResponse<ResponseType> & {

    options: SelectOptionType[]

}
export type SelectionResponse<SelectOptionType = SelectOption> = SelectionResponseBase<SelectOptionType> & {
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