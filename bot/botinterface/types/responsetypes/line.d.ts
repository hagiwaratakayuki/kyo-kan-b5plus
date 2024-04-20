
import type { SelectionResponse, SelectionResponseYN, SelectOptionBase, BaseStateResponse } from "./basic";


export type LineAltBasic = {
    altText: string
}

export type LineTitleTextBasic = {
    title?: string
    text: string
}

export type LineAltTitleTextBasic = LineAltBasic & LineTitleTextBasic
export type LineSelectionResponseType<SelectOptionType = SelectOptionBase> = SelectionResponse<SelectOptionType> & LineAltTitleTextBasic
export type LineSelectionTypeYN<SelectOptionType = SelectOptionBase> = SelectionResponseYN<SelectOptionType> & LineAltTitleTextBasic

export type LineSelectionPluginResponse = BaseStateResponse<LineSelectionResponseType>
export type LineSelectionResponseYN<SelectOptionType = SelectOptionBase> = BaseStateResponse<LineSelectionTypeYN>
