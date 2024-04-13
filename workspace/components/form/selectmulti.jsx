
import { useRef, useState } from "react";
import { uniqueMaker } from "../util.mjs";
/**
 * 
 * @param {{KEY:string, selectOptions:{value:string, label:string, isSelected?:boolean }[],  init:{[value:string]: boolean}  onUpdate:Function, Checkbox:Function}}  param0 
 */
export function Selectmulti({ KEY, onUpdate, selectOptions, isAllowEmpty = false, Checkbox = _checkbox }) {
    const parentKey = uniqueMaker(KEY, 'checkselection');
    const init = Object.fromEntries(selectOptions.map(function ({ value, isSelected = false }) {
        return [value, isSelected];
    }))
    let checkRef = useRef(init);



    function _onChange(value, isSelected) {
        checkRef.current[value] = isSelected;
        _triggerUpdate();

    }
    function _triggerUpdate() {
        const selected = Object.entries(checkRef.current).filter(function ([value, isSelected]) {
            return isSelected
        }).map(function ([value, isSelected]) {
            return value;
        })
        onUpdate(selected, !isAllowEmpty && selected.length === 0);

    }


    const inputs = selectOptions.map(function ({ value, label, isSelected }) {

        return <Checkbox key={value} {...{ parentKey, value, label, onChange: _onChange, isSelected }} />

    })
    _triggerUpdate()

    return (
        <>
            {inputs}
        </>)
}
/**
 * 
 * @param {{parentKey:string, value:string, labal:string, onChange:Funcction  isSelected?:boolean}} param0
 */
function _checkbox({ parentKey: pareantKey, value, label, onChange, isSelected = false }) {
    const [checked, setChecked] = useState(isSelected);
    const name = uniqueMaker(value, pareantKey)
    /**
     * 
     * @param {} event 
     */
    function _onChange() {
        const toggled = !checked;
        setChecked(toggled)
        onChange(value, toggled)

    }


    return <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 mb-3  hover:bg-indigo-300 cursor-pointer ">
        <input type="checkbox" name={name} value={name} onChange={_onChange} checked={checked} />
        <i className="pl-2">{label}</i>
    </label>


}