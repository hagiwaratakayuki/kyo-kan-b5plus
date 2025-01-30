
const { getPluginScenarioStep } = require("../../botinterface/plugin/interface/select/pluginselect");

/*

const defaultOptions = {
    i18n: {
        ja: {
            message: "やりたいことを選んでください",
            select: {
                develop: "ボットを作る",
                //search: "ボットを探す",
                execute: "開発したbotを使う",
                //edit: "開発したbotを編集する"

            }
        },


    }
}
*/
const scenario = getPluginScenarioStep({
    develop: {
        builder: 'develop',
        i18n: {
            ja: {
                label: "botを作る"
            }
        }

    },
    execute: {
        builder: 'execute',
        i18n: {
            ja: {
                label: "開発したbotを使う"
            }
        }
    }


}, {
    ja: {
        message: "やりたいことを選んでください"
    }
})



module.exports = { scenario }