const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const ScheduleSchema = new mongoose.Schema({
    Day:{
        type:String,
    },
    StartTime:{
        type:String,
    },
    EndTime:{
        type:String,
    }
})

const Schedule = mongoose.model('SCHEDULE',ScheduleSchema)

module.exports = Schedule;