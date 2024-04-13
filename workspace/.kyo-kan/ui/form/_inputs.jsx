import { Renderer } from "./_renderer"
import { Description as _Description } from '../../generate/form_description.mjs';
import { Frame as _Frame } from "../../generate/frame.mjs";
import * as  _componentMap from '../../generate/form_components';
import { If } from 'react-if';



const componentMap = Object.fromEntries(Object.entries(_componentMap).map(function ([key, value]) {
    return [key.toLowerCase(), value]
}))
/**
 * @typedef {{[key:string]:{questionType:string, data:any, description?: string}}} Datas 
 * @param {{datas, Description:Function, binder?:{bind:Function} Frame:Function}} param0
 * @returns 
 */
export function Inputs({ datas, binder, Description = _Description, Frame = _Frame }) {


    const forms = Object.entries(datas).map(function ([key, value]) {
        const { questionType, data } = value

        const props = {
            ...data,
            KEY: key

        }
        if (binder) {
            props.onUpdate = binder.bind({
                key
            })
        }
        else {
            props.onUpdate = function () { }
        }


        return (
            <Frame key={key}>
                <If condition={!!data.description}>
                    <Description description={data.description} />
                </If>
                <Renderer componentMap={componentMap} componentType={questionType} componentProps={props}></Renderer>
            </Frame>
        )
    })
    return <>{forms}</>


}