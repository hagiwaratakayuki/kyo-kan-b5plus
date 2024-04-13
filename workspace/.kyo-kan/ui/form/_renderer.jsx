import { useState } from "react"
import { Cable } from "../../util/cable.mjs"






function RendereComponent({ Component, componentProps }) {


    return <Component {...componentProps} />
}

/**
 * 
 * @param {{componentMap:{[name:string]: Function }, componentType:string, componentProps:any}} param0 
 */
export function Renderer({ componentMap, componentType, componentProps }) {
    return <RendereComponent Component={componentMap[componentType]} componentProps={componentProps}></RendereComponent>

}

