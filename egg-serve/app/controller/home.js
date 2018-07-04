'use strict';
// _
// | |
// | |  ___  _ __ ___    ___   ___   ___  _ __
// | | / _ \| '_ ` _ \  / _ \ / __| / _ \| '_ \
// | ||  __/| | | | | || (_) |\__ \|  __/| | | |
// |_| \___||_| |_| |_| \___/ |___/ \___||_| |_|

const Controller = require('egg').Controller;

class HomeController extends Controller {

    * index() {
        this.ctx.body = '  _                                           \n' +
            ' | |                                          \n' +
            ' | |  ___  _ __ ___    ___   ___   ___  _ __  \n' +
            ' | | / _ \\| \'_ ` _ \\  / _ \\ / __| / _ \\| \'_ \\ \n' +
            ' | ||  __/| | | | | || (_) |\\__ \\|  __/| | | |\n' +
            ' |_| \\___||_| |_| |_| \\___/ |___/ \\___||_| |_|\n' +
            '                                              \n' +
            '     ';
    }

    * save() {
        const {ctx} = this;
        const user = new this.ctx.model.Test({
            name: `${ctx.params.name}`,
        });
        yield user.save();
        this.ctx.body = user;
    }

    // async
    * list() {
        let list =yield  this.ctx.model.Test.find({})
        yield this.ctx.render('index.tpl', {list: list});
    }

    * findByName() {
        const {ctx} = this;
        const books = yield this.ctx.model.Test.findOne({name: `${ctx.params.name}`});
        this.ctx.body = JSON.stringify(books);
    }

    * remove() {
        const {ctx} = this;
        const books = yield this.ctx.model.Test.findOneAndRemove({name: `${ctx.params.name}`});
        this.ctx.body = JSON.stringify(books);
    }
}

module.exports = HomeController;

