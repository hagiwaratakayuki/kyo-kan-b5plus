const { execa } = await import('execa');
const path = require('node:path')
const process = require('node:process');
IS_LOCAL = process.argv.length == 4
const kid = process.argv[2]





async function main() {

        const targetPath = path.join(__dirname, '../../../bot');
        const { stdout } = await execa('node', ['./bot/line-secret-manager/reader.js'], { cwd: targetPath });


        console.error(err);

}