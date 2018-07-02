// app/service/news.js
const Service = require('egg').Service;

// const MongoDB = require('mongo');
class NewsService extends Service {
    async list(page = 1) {
        var MongoClient = require('mongodb').MongoClient,
            test = require('assert');
        // Connection url
        var url = 'mongodb://localhost:27017/local';
        // Connect using MongoClient
        MongoClient.connect(url, function (err, db) {
            // Use the admin database for the operation
            var adminDb = db.admin();
            // List all the available databases
            adminDb.listDatabases(function (err, dbs) {
                test.equal(null, err);
                test.ok(dbs.databases.length > 0);
                db.close();
            });
        });
        // console.log(app)
        // console.log(app.mongo)
        // MongoDB.db.collection('name').insertOne(doc, options);
        // read config
        const {serverUrl, pageSize} = this.config.news;

        // use build-in http client to GET hacker-news api
        const {data: idList} = await this.ctx.curl(`${serverUrl}/topstories.json`, {
            data: {
                orderBy: '"$key"',
                startAt: `"${pageSize * (page - 1)}"`,
                endAt: `"${pageSize * page - 1}"`,
            },
            dataType: 'json',
        });

        // parallel GET detail
        const newsList = await Promise.all(
            Object.keys(idList).map(key => {
                const url = `${serverUrl}/item/${idList[key]}.json`;
                return this.ctx.curl(url, {dataType: 'json'});
            })
        );
        return newsList.map(res => res.data);
    }
}

module.exports = NewsService;


