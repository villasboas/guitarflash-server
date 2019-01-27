const chalk = require('chalk');

module.exports = {
    danger:  msg => console.log(chalk.red(msg)),
    success: msg => console.log(chalk.green(msg)),
    warning: msg => console.log(chalk.yellow(msg)),
    info:    msg => console.log(chalk.blueBright(msg)),
    log:     msg => console.log(msg)
};

// End of file
