import { useRef, useState } from "react";
import { Inputs as _Inputs } from "./inputs";
import { Cable } from "../../util/cable.mjs";
import { FormLayout as _FormLayout } from "../../generate/form_layout.mjs";

class IsEmptyCable extends Cable {
    constructor(datas) {
        super(datas)
        this.isEmpties = {};
    }
}
/**
 * 
 * @param {Object} param0 
 * @param {Fubtion} param0.onSend 
 * @param {Cable<import>} param0.inputsCable 
 * @param {import("../loadingstate").LoadingStateCable} param0.loadingStateCable 
 * @param {Function} [param0.FormLayout=_FormLayout] 
 * @param {Function} [param0.Inputs=_Inputs]  
 * @returns 
 */
export function Form({ onSend, inputsCable, loadingStateCable, FormLayout = _FormLayout, Inputs = _Inputs }) {

    const upData = useRef({});

    const loadingState = loadingStateCable.connect();
    if (loadingState.progress === 'success') {
        upData.current = {}

    }


    const isEmptyCableRef = useRef(new IsEmptyCable(true))

    function _onSend() {


        onSend(upData.current, inputsCable.datas)

    }
    function _onUpdate(key, value, isEmpty = false) {
        upData.current[key] = value;
        isEmptyCableRef.current.isEmpties[key] = isEmpty;
        const _isEmpty = Object.values(isEmptyCableRef.current.isEmpties).some(function (r) {
            return r
        })
        if (isEmptyCableRef.current.data !== _isEmpty) {
            isEmptyCableRef.current.send(_isEmpty)
        }




    }
    return (
        <FormLayout onSend={_onSend} isEmptyCable={isEmptyCableRef.current} loadingStateCable={loadingStateCable}>
            <Inputs inputsCable={inputsCable} onUpdate={_onUpdate} />
        </FormLayout>

    )

}