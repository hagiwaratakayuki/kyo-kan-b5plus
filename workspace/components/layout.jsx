import { Fragment } from "react";

/**
 * @typedef {import("react").ReactNode} ReactNode
 * @typedef {import("../.kyo-kan/util/cable.mjs").Cable} Cable
 * @typedef {{[key: string]: Cable}} CableMap
 * @typedef {{[key:string]:Function}} Handlers
 * @param {{selectedSenario:ReactNode, scenarioSelector:ReactNode, form:ReactNode, formLogs:ReactNode, senarioHandlers:Handlers, formHandlers}} param0 
 */
export function Layout({ selectedSenario, scenarioSelector, form, formLogs }) {
    return (
        <>

            <div className="grid grid-cols-5">
                <div className=" sm:col-span-2 max-sm:col-span-5">
                    {scenarioSelector}
                </div>
                <div className="sm:col-span-3 max-sm:row-span-5">
                    {selectedSenario}
                    {formLogs}
                    {form}
                </div>
            </div >
        </>


    )


}