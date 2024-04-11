const executer = require("./executer");
const creater = require('./creater');
const process = require("node:process");

async function runner() {
    await creater();
    console.log("-------------------------------------")
    console.log("creation done")
    console.log("start execution")
    console.log("-------------------------------------")

    await executer();
}

function main() {
    runner().then(function () {
        process.exit()
    })
}

main()