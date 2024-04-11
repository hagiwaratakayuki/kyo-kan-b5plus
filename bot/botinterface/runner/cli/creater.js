const path = require("node:path");
const { Saver, Loader } = require("../../../kyo-kan/looploader/save_and_load");

const fs = require("node:fs")




const process = require("node:process");
const { Connector } = require("../../connecter/cli");
const { createRouter } = require("../router/creater");
const { Creater } = require("../../creater");


function main() {
    create().then(function () {
        process.exit(0)
    })
}

async function create() {
    const saver = new Saver()
    const loader = new Loader(true);
    const creater = new Creater(saver, loader)
    const connecter = new Connector(creater)

    createRouter(loader, saver)
    await connecter.run()

    const data = JSON.stringify(saver.toJSON())
    fs.writeFileSync(path.join(process.cwd(), 'bot2bot/exampledata/cli.json'), data)


}

if (require.main === module) {
    main();
}

module.exports = create