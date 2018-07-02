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
        var mongoose = require('mongoose')
// Connection url
        var url = 'mongodb://localhost:27017/test';
        let test=mongoose.model('Test',{
            name:String
        })
        mongoose.Test.find();
        // yield ctx.model.User.find({});
        // this.ctx.model.Post.find({})
        // exports.index = function* (ctx) {
        //     ctx.body = yield ctx.model.Post.find({}); // get data from db1
        // }
        // this.ctx.model.Post.findOneAndUpdate({_id: "5b39cb1acb7797a630caeb42"}, post).exec();
        // this.ctx.body=this.ctx.model.Post.find().sort({_id:-1}).exec()
        // var MongoClient = require('mongodb').MongoClient,
        //     test = require('assert');
        // // Connection url
        // var url = 'mongodb://localhost:27017/test';
        // // Connect using MongoClient
        // MongoClient.connect(url, function (err, db) {
        //     // Use the admin database for the operation
        //     var adminDb = db.admin();
        //     console.log(adminDb);
        //     // List all the available databases
        //     adminDb.listDatabases(function (err, dbs) {
        //         test.equal(null, err);
        //         test.ok(dbs.databases.length > 0);
        //
        //         db.close();
        //     });
        // });
        // this.ctx.body = '  _                                           \n' +
        //     ' | |                                          \n' +
        //     ' | |  ___  _ __ ___    ___   ___   ___  _ __  \n' +
        //     ' | | / _ \\| \'_ ` _ \\  / _ \\ / __| / _ \\| \'_ \\ \n' +
        //     ' | ||  __/| | | | | || (_) |\\__ \\|  __/| | | |\n' +
        //     ' |_| \\___||_| |_| |_| \\___/ |___/ \\___||_| |_|\n' +
        //     '                                              \n' +
        //     '     ';

    }

    async lemosen() {
        const ctx = this.ctx;
        const page = ctx.query.page || 1;
        const newsList = await ctx.service.main.list(page);
        await this.ctx.render('index.tpl', newsList);
    }
}

module.exports = HomeController;

