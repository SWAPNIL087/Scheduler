const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const AppsSchema = new mongoose.Schema({
    app_name:{
        type:String,
    },
    status:{
        type: String,
        enum : ['A','B'],  // available,blocked
        default: 'A',
    },
    WeekdaysTimer:{
        type:String
    },
    WeekendsTimer:{
        type:String
    }
})

const Apps = mongoose.model('APP',AppsSchema)

module.exports = Apps;