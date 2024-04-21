import type { StateResponse } from "../../../kyo-kan/plugin_type";
/*
// todo move to workspace type
export type BaseResponse<ResponseType> = {
    title?: string
    description?: string
    responsType: ResponseType
}
*/

export type BaseResponse<ResponseType> = {
    responsType: ResponseType
}
export type BaseStateResponse<ResponseDifinition> = StateResponse<ResponseDifinition>

export type ResponseTypeMessage = "message"
export type MessageResponse = BaseResponse<ResponseTypeMessage> & {
    text: string
}
export type MessageStateResponse = StateResponse<MessageResponse>


export type ResponseTypeSelection = "selection"
export type ResponseTypeYN = "YN"




export type SelectOptionBase<ValueType = string> = {
    label: string
    value: ValueType


}




export type SelectionResponseBase<ResponseType, SelectOptionType = SelectOptionBase> = BaseResponse<ResponseType> & {

    options: SelectOptionType[]

}
export type SelectionResponse<SelectOptionType = SelectOptionBase> = SelectionResponseBase<ResponseTypeSelection, SelectOptionType> & {
    isMultiple?: boolean
}
export type SelectionResponseYN<SelectOptionType = SelectOptionBase> = SelectionResponseBase<ResponseTypeYN, SelectOptionBase>





// old 

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