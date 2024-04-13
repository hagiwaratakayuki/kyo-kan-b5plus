
import { useState } from "react";
import { uniqueMaker } from "../util.mjs";

const Y = "yes"
const N = "no"
const Y_N = Y + N;

export function YN({ KEY, onUpdate, init = true }) {
    const initState = init ? Y : N;
    const [selected, setSelected] = useState(initState);

    /**
     * 
     * @param {import("react").ChangeEvent<HTMLInputElement>} event 
     */
    function _onChange(event) {
        setSelected(event.target.value)
        onUpdate(event.target.value === Y, true)
    }
    return (
        <div
            className="rounded-full flex w-fit bg-gray-50 border border-gray-300 py-2 px-4 space-x-4 group-checked:border-gray-500">
            <div className="w-fit">
                <input type="radio" name={uniqueMaker(KEY, Y_N)} id={uniqueMaker(KEY, Y)} value={Y} className="peer hidden" checked={selected === Y} onChange={_onChange} />
                <label htmlFor={uniqueMaker(KEY, Y)}
                    className="cursor-pointer w-fit inline-block peer-checked:text-blue-700 peer-checked:cursor-default text-gray-400">Yes</label>
            </div>
            <div className="w-fit" >
                <input type="radio" name={uniqueMaker(KEY, Y_N)} id={uniqueMaker(KEY, N)} value={N} className="peer hidden" checked={selected === N} onChange={_onChange} />
                <label htmlFor={uniqueMaker(KEY, N)}
                    className="cursor-pointer inline-block w-fit peer-checked:text-gray-800 peer-checked:cursor-default text-gray-400">No</label>
            </div>
        </div>

    )
}