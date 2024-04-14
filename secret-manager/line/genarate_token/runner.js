const execa = require('execa');

(async () => {
    try {
        const { stdout } = await execa('ls', { cwd: './path/to/directory' });
        console.log(stdout);
    } catch (err) {
        console.error(err);
    }
})();