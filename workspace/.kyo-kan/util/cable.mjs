import { useState, useRef } from "react";


export function createCable(initData) {
    return useRef(new Cable(initData))

}

/**
 * @template T
 */
export class Cable {
    constructor(datas) {
        /**
         * @type {T}
         */
        this.datas = datas
        this._setterMap = new Map()
        this._onSends = new Map()

    }

    /**
     * 
     * @param {T| undefined} datas 
     */
    send(datas) {



        if (typeof datas !== "undefined") {
            this.datas = datas
        }

        for (const setter of this._setterMap.keys()) {

            setter(this.datas)
        }

    }
    /**
     * 
     * @returns {T}
     */
    connect() {
        const [value, setter] = useState(this.datas)
        this._setterMap.set(setter, true)
        console.log('connect');



        return value;
    }

}

