'use strict';
// _
// | |
// | |  ___  _ __ ___    ___   ___   ___  _ __
// | | / _ \| '_ ` _ \  / _ \ / __| / _ \| '_ \
//  | ||  __/| | | | | || (_) |\__ \|  __/| | | |
// |_| \___||_| |_| |_| \___/ |___/ \___||_| |_|

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        this.ctx.body = '  _                                           \n' +
            ' | |                                          \n' +
            ' | |  ___  _ __ ___    ___   ___   ___  _ __  \n' +
            ' | | / _ \\| \'_ ` _ \\  / _ \\ / __| / _ \\| \'_ \\ \n' +
            ' | ||  __/| | | | | || (_) |\\__ \\|  __/| | | |\n' +
            ' |_| \\___||_| |_| |_| \\___/ |___/ \\___||_| |_|\n' +
            '                                              \n' +
            '     ';
    }

    async lemosen() {
        const ctx = this.ctx;
        const page = ctx.query.page || 1;
        const newsList = await ctx.service.main.list(page);
        await this.ctx.render('index.tpl', newsList);
    }
}

module.exports = HomeController;
