'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    router.get('/', controller.home.index);
    router.get('/find/:name', controller.home.findByName);
    router.get('/remove/:name', controller.home.remove);
    router.get('/list', controller.home.list);
    router.get('/save/:name', controller.home.save);
};
