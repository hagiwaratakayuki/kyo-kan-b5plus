import { Inputs as BaseInputs } from "./_inputs";

/**
 * @typedef {{[key:string]:{questionType:string, data:any, description?: string}}} Datas 
 * @param {{inputsCable:import("../../util/cable.mjs").Cable<Datas>,onLoad:Function Description:Function, onUpdate:Function Frame:Function}} param0
 * @returns 
 */
export function Inputs({ inputsCable, onUpdate }) {
    const inputsState = inputsCable.connect()
    const binder = {
        func: function (_value, isEmpty) {
            this.onUpdate(this.key, _value, isEmpty)
        },
        onUpdate: onUpdate,
        bind: function (params) {
            return this.func.bind(Object.assign({}, { onUpdate: this.onUpdate }, params))
        }
    }





    return <><BaseInputs datas={inputsState} binder={binder} /></>


}