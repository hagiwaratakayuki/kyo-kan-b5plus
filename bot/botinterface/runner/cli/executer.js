const { Loader } = require("../../../kyo-kan/looploader/save_and_load");
const fs = require("node:fs");
const path = require("node:path");
const process = require("node:process");
const { StateController } = require("../../../kyo-kan/state_controller");
const { executeRouter } = require("../router/executer");


function main() {
    execute().then(function () {
        process.exit();
    })
}

async function execute() {

    const JSONData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'bot2bot/exampledata/cli.json'), { encoding: "utf-8" }))
    const loader = new Loader(true);
    executeRouterr(loader);
    loader.fromJSON(JSONData)
    const controller = new StateController(loader)

    while (controller.isEnd() === false) {
        await controller.run({})


    }

}

if (require.main === module) {
    main();
}
module.exports = execute