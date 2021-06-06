const dbConfig = require("../config/url.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.employees = require("./model.js")(mongoose);

module.exports = db;