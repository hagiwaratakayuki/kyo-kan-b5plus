import { useState } from "react";

export class StateExample {
    constructor(value) {
        this.value = value
        //this._setterMap = new Map()
        /**
         * @type {{value:any, setter:any}}
         */
        this._state = null


    }
    getState() {
        console.log('getState')
        if (this._state) {
            return this._state.value
        }

        const [value, setter] = useState(this.value);
        this._state = { value, setter }
        return value;
    }
    set(value) {
        this.value = value
        this._state.setter(value)
        /*
        for (const setter of this._setterMap.keys()) {
            setter(this.value)
        }*/
    }
} 