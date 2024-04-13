import { Inputs } from "./inputs";
import { Cable } from "../../util/cable.mjs";
import { datas } from "./mock_datas.mjs";


export default {
    title: 'Kyo-Kan/UI/Form/Inputs',
    component: Inputs,

    parameters: {

        layout: 'fullscreen',
    },
};


export const Basic = {
    args: {
        primary: true,
        inputsCable: new Cable(datas),
        onUpdate: () => { }

    },
};
