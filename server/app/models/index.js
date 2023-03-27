const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.product = require("./product.model");

module.exports = db;
