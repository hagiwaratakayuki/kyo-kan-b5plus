import { Layout } from "../generate/layout.mjs";
import { Form as _Form } from "./form/form";
import { Logs as _Logs } from "./logs/logs";
import { Cable } from "../util/cable.mjs";
import { useRef } from "react";

class LogsCable extends Cable {
    constructor() {
        super([]);

    }
    send(formConfig, values) {


        this.datas = this.datas.concat([{ formConfig, values }])

        super.send();


    }
}

/** 
 * @param {Object} param0 
 * @param {Function} param0.onSend 
 * @param {Cable} param0.isLoadingCable 
 * @param {Cable} [param0.inputsCable] 
 * @param {_Form} [param0.Form=_Form]
 * @param {_Logs} [param0.Logs=_Logs] 
 */
export function Page({ onSend, isLoadingCable, inputsCable, Form = _Form, Logs = _Logs }) {
    const logsCableRef = useRef(new LogsCable())

    function _onSend(upData, forms) {
        onSend(upData)

        logsCableRef.current.send(forms, upData);


    }
    return (<>
        <Layout
            form={<Form onSend={_onSend} loadingStateCable={isLoadingCable} inputsCable={inputsCable} />}
            formLogs={<Logs logCable={logsCableRef.current} />}
            selectedSenario={"selected"}
            scenarioSelector={"slecter"}
            isLoadingCable={isLoadingCable}
        />
    </>)

}