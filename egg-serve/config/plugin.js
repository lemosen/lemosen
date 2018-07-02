'use strict';

// had enabled by egg
// exports.static = true;
// config/plugin.js
exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks'
};

// exports.mongo = {
//     enable: true,
//     package: 'egg-mongo-native',
// };
exports.mongoose = {
    enable: true,
    package: 'egg-mongoose',
};