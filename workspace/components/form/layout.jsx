
import { Fragment, useEffect, useRef } from "react"
import { If, Then, Else } from "react-if"
/**
 * @typedef {import("../../.kyo-kan/util/cable.mjs/index.js").Cable} Cable
 */
/**
 * 
 * @param {{isEmptyCable:Cable, onSend:Function}} param0 
 */

function ButtonBox({ isEmptyCable, onSend }) {
    const isEmpty = isEmptyCable.connect()

    const _onSend = function () {
        onSend()
        return false
    }
    return (
        <div className="text-center mt-3 mb-4">
            <button type="button" onClick={_onSend} className="disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 enabled:bg-green-500 hover:enabled:bg-green-700 hover:enabled:active:bg-green-800 px-4 py-2 rounded-md text-white" disabled={isEmpty}>
                Submit
            </button>
        </div>
    )

}

/**
 * 
 * @param {{children:any, onSend:Function, isEmptyCable:Cable, loadingStateCable:import('../../.kyo-kan/ui/loadingstate').LoadingStateCable}} param0 
 */
export function FormLayout({ children, onSend, isEmptyCable, loadingStateCable }) {
    const loadingState = loadingStateCable.connect()
    /**
     * @type {{current:HTMLDivElement}}
     */
    const domRef = useRef(null)
    useEffect(function () {
        domRef.current.scrollIntoView()
    })
    return (
        <Fragment>
            <If condition={loadingState.progress !== "loading"}>
                <Then>
                    <div ref={domRef} className="pt-2 pb-5">
                        {children}
                        <ButtonBox onSend={onSend} isEmptyCable={isEmptyCable} />

                    </div>

                </Then>
                <Else>
                    <div class="flex justify-center items-center h-screen">
                        <div class="relative inline-flex">
                            <div class="w-8 h-8 bg-blue-500 rounded-full"></div>
                            <div class="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
                            <div class="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
                        </div>
                    </div>
                </Else>
            </If>
        </Fragment>)

}