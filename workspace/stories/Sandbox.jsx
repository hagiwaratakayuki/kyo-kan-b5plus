import { useRef, useState } from "react";
import { StateExample } from "./tunneltest.mjs";


function TestComponent({ value }) {
    return <>{value}</>
}
function Example({ message }) {
    console.log('render example');

    const counter = message.getState();
    return (
        <>

            <input type="text"></input>
            {counter}
        </>)
}
function Example2({ message }) {
    console.log('render example2');

    const counter = message.getState();
    return (
        <>

            <input type="text"></input>
            {counter}
        </>)
}
export function Sandbox() {

    console.log('render sandbox')
    const messageRef = useRef(new StateExample(0))
    /*
    const message = {
        on: function (callback) {
            this._callback = callback
        },
        trigger: function () {
            this.count += 1
            this._callback(this.count)

        },
        count: 0
    }
    */
    function hundleClick() {
        messageRef.current.set(messageRef.current.value + 1)
    }

    return (
        <>
            <input type="text"></input>
            <Example message={messageRef.current}></Example>
            <div onClick={hundleClick}>click</div>
            <Example2 message={messageRef.current}></Example2>
        </>
    )

}


