import { LoopStepConfigure } from "../../../../../kyo-kan/loopsceinario_configure/configure_type"
import { i18nPluginOptionValue } from "../../../../../kyo-kan/plugin_type"

export type SelectOptionMessage = {
    label: string
}
export type SelectOptionMessages = i18nPluginOptionValue<SelectOptionMessage>
export type SelectOption = LoopStepConfigure & {
    i18n: SelectOptionMessages

}

export type Select = {
    [key in string]: SelectOption
}