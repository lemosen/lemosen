
'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const BookSchema = new Schema({
        name: { type: String },
    });

    return mongoose.model('Test', BookSchema);
}

