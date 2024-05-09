
import type { TextMessage } from "@line/bot-sdk";
import type { SelectionResponse, SelectionResponseYN, SelectOptionBase, BaseStateResponse, MessageStateResponse } from "../../types/responsetypes/basic";


export type LineMessageStateResponse = MessageStateResponse<TextMessage>

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

export type LineMessageStateResponse = BaseStateResponse<MessageStateResponse<TextMessage>>


