
import { useState } from "react";
import { uniqueMaker } from "../util.mjs";
/**
 * 
 * @param {{KEY:string,  selectOptions:{value:string, label:string }[], onUpdate:Function, init: null | string}}  param0 
 */
export function Selectone({ KEY, onUpdate, selectOptions, init = null }) {
    const name = uniqueMaker(KEY, 'radioselection')
    let initState;
    if (init === null) {
        initState = selectOptions[0].value

    }
    else {
        initState = init
    }

    const [selected, setSelected] = useState(initState);

    /**
     * 
     * @param {import("react").ChangeEvent} event 
     */
    function _onChange(event) {
        setSelected(event.target.value)
        _triggerUpdate(event.target.value)

    }
    function _triggerUpdate(value) {
        onUpdate(value, false)
    }
    _triggerUpdate(selected);

    const inputs = selectOptions.map(function ({ value, label }) {

        return <label key={value} className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300 cursor-pointer ">
            <input type="radio" name={name} value={value} onChange={_onChange} checked={selected === value} />
            <i className="pl-2">{label}</i>
        </label>
    })

    return (
        <>

            {inputs}

        </>)
}