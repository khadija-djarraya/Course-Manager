const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    coursecode:{
        type: String,
        required: true,
        unique:true
    },
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required:false
    },
    cohort: String
})

const Coursedb = mongoose.model('coursedb',schema);

module.exports= Coursedb;