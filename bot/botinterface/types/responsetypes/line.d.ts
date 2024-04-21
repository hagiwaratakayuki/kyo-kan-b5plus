
import type { SelectionResponse, SelectionResponseYN, SelectOptionBase, BaseStateResponse, MessageStateResponse } from "./basic";
export type LineMessageStateResponse = MessageStateResponse

export type LineAltBasic = {
    altText: string
}

export type LineTitleTextBasic = {
    title?: string
    text: string
}

export type LineAltTitleTextBasic = LineAltBasic & LineTitleTextBasic



export type LineSelectionResponseType<SelectOptionType = SelectOptionBase> = SelectionResponse<SelectOptionType> & LineAltTitleTextBasic
export type LineSelectionResponseTypeYN<SelectOptionType = SelectOptionBase> = SelectionResponseYN<SelectOptionType> & LineAltTitleTextBasic

export type LineSelectionStateResponse<SelectOptionType = SelectOptionBase> = BaseStateResponse<LineSelectionResponseType<SelectOptionType>>
export type LineSelectionStateResponseYN<SelectOptionType = SelectOptionBase> = BaseStateResponse<LineSelectionResponseTypeYN<SelectOptionType>>

