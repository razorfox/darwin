var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Model = {};

var QuerySchema = new Schema({
    query: {type: String, required: true, trim: true},
    count: {type: Number, required: true},
    identifier: {type: String, required: true, trim: true},
    createdAt: {type: Date, default: Date.now}
});

Model.Query = mongoose.model("Query", QuerySchema);

module.exports.Model = Model;

