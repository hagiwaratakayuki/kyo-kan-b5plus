import type { StateResponse } from "../../../kyo-kan/plugin_type";

export type BaseStateResponse<ResponseDifinition> = StateResponse<ResponseDifinition>

export type StandardizedClientResponseCommon<ResponseTypeName = string> = {
    responseType: ResponseTypeName
    title: string
    message: string
}

export type ResponseTypeMessage = "message"
export type StandardizedMessageResponse = StandardizedClientResponseCommon<ResponseTypeMessage>
export type StandardizedMessageStateResponse = StateResponse<StandardizedMessageResponse>


export type StandardizedResponseTypeSelection = "selection"
export type StandardizedResponseTypeYN = "YN"

export type StandardizedSelectOptionBase<ValueType = string> = {
    label: string
    value: ValueType


}

export type StandardizedResponseTypeTextInput = "text"
export type StandrazedTextInputResponse = StandardizedClientResponseCommon<StandardizedResponseTypeTextInput> & {
    isTextArea: boolean
    placeHolder?: string
}

export type StandardizedSelectionResponseBase<ResponseTypeName, SelectOptionType = StandardizedSelectOptionBase> = StandardizedClientResponseCommon<StandardizedClientResponseCommon> & {

    options: SelectOptionType[]

}

export type StandardizedSelectionResponse<SelectOptionType = StandardizedSelectOptionBase> = StandardizedSelectionResponseBase<StandardizedResponseTypeSelection, SelectOptionType> & {
    isMultiple?: boolean
}
export type StandardizedSelectionStateResponse<SelectOptionType = StandardizedSelectOptionBase> = StateResponse<StandardizedSelectionResponse<SelectOptionType>>

export type StandardizedSelectionResponseYN<SelectOptionType = StandardizedSelectOptionBase> = StandardizedSelectionResponseBase<StandardizedResponseTypeYN, StandardizedSelectOptionBase>

export type StandardizedSelectionStateResponseYN<SelectOptionType = StandardizedSelectOptionBase> = StateResponse<StandardizedSelectionResponse<SelectOptionType>>

export type StandardizedScenarioSwitchCientResponse<ScenarioInitType = any> = {
    scenarioId: any,
    scenarioInit?: ScenarioInitType,
    reset?: boolean
}

export type StandardizedScenarioSwitchResponse<ScenarioInitType = any> = StateResponse<StandardizedScenarioSwitchCientResponse<ScenarioInitType>>



