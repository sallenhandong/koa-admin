/**
 * Created by 1 on 2016/5/16.
 */
const mongoose = require('../mongodb').mongoose

const  newsschema=new mongoose.Schema({
    title:String,
    content:String,
    time:String,
    category:String,
    from:String,
});

module.exports = mongoose.model('News',newsschema);