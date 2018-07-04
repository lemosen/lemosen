'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_123456';

    // add your config here
    config.middleware = [];
    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.tpl': 'nunjucks',
        },
    };
    config.news = {
        pageSize: 5,
        serverUrl: 'https://hacker-news.firebaseio.com/v0',
    };
    config.mongoose = {
        client: {
            url: 'mongodb://127.0.0.1:27017/test',
            options: {},
        },
    };

    return config;
};
