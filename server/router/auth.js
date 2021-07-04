const express  = require('express');

const router = express.Router()

require('../db/conn');

const Apps = require('../model/Apps');

const Schedule = require('../model/schedule')

router.get('/',(req,res)=>{
    res.send('<h1>Hello World!</h1>')
})

router.get('/blockedApps',async(req,res)=>{
    const data = await Apps.find({status:'B'});
    res.send(data);
})

router.get('/unblockedApps',async(req,res)=>{
    const data = await Apps.find({status:'A'});
    res.send(data);
})

router.post('/updateStatus',(req,res)=>{
    const id = (req.body.id)
    const currStat = req.body.stat
    console.log(id)
    if(currStat == 'B'){
        Apps.findOneAndUpdate({
            _id: id
        },{'status':'A'},{upsert: true}, function(err, doc) {
            if (err) return res.send(500, {error: err});
            return res.send('Succesfully saved.');
        })
    }
    else{
        Apps.findOneAndUpdate({
            _id: id
        },{'status':'B'},{upsert: true}, function(err, doc) {
            if (err) return res.send(500, {error: err});
            return res.send('Succesfully saved.');
        })
    }
})

router.post('/edittime',(req,res)=>{
    const id = req.body.id;
    const time = req.body.time;
    const time2 = req.body.time2;
    Apps.findByIdAndUpdate(id, {'WeekdaysTimer' : time, 'WeekendsTimer':time2 },
    function (err, docs) {
        if (err){
            console.log(err)
        }
        }
    )
    res.send('success');
})

router.post('/setSchedule',async(req,res)=>{
    const slots = req.body.slots;
    const days = req.body.days;
    console.log('req recieved',slots,days)
    
    for (var i=0;i<days.length;i++){
        for(var j=0;j<slots.length;j++){
            var data = {
                Day:days[i],
                StartTime:slots[j][0],
                EndTime:slots[j][1]
            }
            const schedule = new Schedule(data)
            await schedule.save()
 
        }
    }
    res.send('success');

})

router.get('/schedules',async(req,res)=>{
    var final = [];
    const monday = await Schedule.find({'Day':'monday'});
    const tuesday = await Schedule.find({'Day':'tuesday'});
    const wednessday = await Schedule.find({'Day':'wednessday'});
    const thursday = await Schedule.find({'Day':'thursday'});
    const friday = await Schedule.find({'Day':'friday'});
    const saturday = await Schedule.find({'Day':'saturday'});
    const sunday = await Schedule.find({'Day':'sunday'});
    final = [[monday],[tuesday],[wednessday],[thursday],[friday],[saturday],[sunday]]

    res.send(final);
})

router.post('/deleteSlot',async(req,res)=>{
    console.log('req  recievd',req.body.id)
    Schedule.findOneAndDelete({'_id':req.body.id},function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
    })
   
    res.send('success')
})
module.exports = router;