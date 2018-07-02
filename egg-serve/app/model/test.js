
'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const PostSchema = new Schema({
        name: {
            type: String
        }
    });
    return mongoose.model('Post', PostSchema);
}