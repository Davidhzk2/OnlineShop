const mongoose = require('mongoose');
const moment = require('moment');

const categorySchema = new mongoose.Schema({
    name: String, 
    status: Boolean,
    date: {type : Date, defult: Date.now}
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
