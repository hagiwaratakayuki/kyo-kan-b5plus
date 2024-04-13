import { Page } from "./page";
import { Cable } from "../util/cable.mjs";
import { datas } from "./form/mock_datas.mjs";


export default {
    title: 'Kyo-Kan/UI/Page',
    component: Page,

    parameters: {

        layout: 'fullscreen',
    },
};


export const Basic = {
    args: {
        primary: true,
        inputsCable: new Cable(datas),
        isLoadingCable: new Cable(false),
        onSend: () => { }

    },
};
