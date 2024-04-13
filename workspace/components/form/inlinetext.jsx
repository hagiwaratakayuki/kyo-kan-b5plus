
import { useRef } from "react";
import { uniqueMaker } from "../util.mjs";
/**
 * 
 * @param {{KEY:string, onUpdate:Function, init:  string, hint?: string }}  param0 
 */
export function Inlinetext({ KEY, onUpdate, init = '', hint = '' }) {
    const name = uniqueMaker(KEY, 'inlinetext');
    const ref = useRef(init);






    /**
     * 
     * @param {import("react").ChangeEvent<HTMLInputElement>} event 
    */
    function _onInput(event) {
        ref.current = event.target.value



        _triggerUpdate(event.target.value)

    }
    function _triggerUpdate(value) {
        onUpdate(value, !value)
    }
    _triggerUpdate(ref.current);



    return (
        <>

            <input type="text" id={name} name={name} defaultValue={init} placeholder={hint} className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={_onInput} />

        </>)
}