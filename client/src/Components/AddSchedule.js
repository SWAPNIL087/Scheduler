import React, { useState, useEffect } from 'react';

import {BsPlusCircle} from 'react-icons/bs'

import {BsFillTrashFill} from 'react-icons/bs'

const Schedule = ()=>{

    const [slots,setslots] = useState([])

    const [days,setdays] = useState([])

    const [slot1,setslot1] = useState()

    const [slot2,setslot2] = useState()

    const [schedules,setSchedules] = useState([])

    useEffect(async() => {
        console.log('sent the req. for schedules')
        const data = await fetch("/schedules")
        const res = await data.json()
        var arr=[]
        console.log(res)
        console.log(res.length)
        for (var i=0;i<res.length;i++){
            arr.push(res[i])
        }
        console.log(arr)
        setSchedules(arr)

      },[]);

    const daybtn = (e)=>{
        var checkboxes = document.getElementsByClassName('btnlike');
        var arr=[];
        for(var i=0, n=checkboxes.length;i<n;i++) {
            if(checkboxes[i].checked){
                var tem = (checkboxes[i].name);
                arr.push(tem);
            }
          }
        setdays(arr)
    }
    

    const setslot1value = (e)=>{
        console.log(e.target.value)
        setslot1(e.target.value)
    }

    const setslot2value = (e)=>{
        console.log(e.target.value)
        setslot2(e.target.value)
    }
    
    const settingSlot = ()=>{
        var arr = slots;
        arr = [slot1,slot2]
        setslots(slots => [...slots ,arr])
    }

    const setSchedule = async()=>{
        const data = await fetch('/setSchedule',{
            method:'POST',
            headers:{'content-Type':'application/json'},
            body: JSON.stringify({days:days,slots:slots})
        })
        const data2 = await fetch("/schedules")
        const res = await data2.json()
        var arr=[]
        for (var i=0;i<res.length;i++){
            arr.push(res[i])
        }
        setSchedules(arr)
        window.alert('slot added')
    }

    const del = async(id)=>{
        const data = fetch('/deleteSlot',{
            method:'POST',
            headers:{'content-Type':'application/json'},
            body: JSON.stringify({'id':id})
        })
        const data2 = await fetch("/schedules")
        const res = await data2.json()
        var arr=[]
        for (var i=0;i<res.length;i++){
            arr.push(res[i])
        }
        setSchedules(arr)
    }

    return (
        <>
            <div class="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Add Work Time</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <strong className='float-left' >Days Active </strong>
                    <div className='mt-5'>
                        <label><input onChange={daybtn} className="btnlike monday" name='monday' type="checkbox"/><span>M</span></label>
                        <label><input onChange={daybtn} className="btnlike tuesday" name='tuesday' type="checkbox"/><span>T</span></label>
                        <label><input onChange={daybtn} className="btnlike wednessday" name='wednessday' type="checkbox"/><span>W</span></label>
                        <label><input onChange={daybtn} className="btnlike thursday" name='thursday' type="checkbox"/><span>T</span></label>
                        <label><input onChange={daybtn} className="btnlike friday" name='friday' type="checkbox"/><span>F</span></label>
                        <label><input onChange={daybtn} className="btnlike saturday" name='saturday' type="checkbox"/><span>S</span></label>
                        <label><input onChange={daybtn} className="btnlike sunday" name='sunday' type="checkbox"/><span>S</span></label>
                    </div>
                    
                    <div className='slots mt-3'>
                        {
                            slots.map((item,i)=>{
                                return(
                                    <div>
                                        <p> Slot {i+1} - {item[0]} <strong>To</strong> {item[1]} </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='row'>
                        <form className='mt-4 col-6'>
                            <label for="appt">From</label><br/>
                            <input onChange={setslot1value}  className='ml-2 From' type="time" id="appt" name="appt"/>
                        </form>
                        <form className='mt-4 col-6'>
                            <label for="appt">To</label><br/>
                            <input onChange={setslot2value} className='ml-2 To' type="time" id="appt" name="appt"/>
                        </form>
                        
                        <p onClick={settingSlot} className='m-auto text-success addslot' >Add Slot</p>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" onClick={()=>setslots([])} class="btn btn-secondary closemodal" data-dismiss="modal">Cancel</button>
                    <button type="button" onClick={setSchedule} class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
            </div>

            <div>
            <h2>Schedules</h2>
            <div className='row col-10 m-auto'>
            {
                schedules.map((items,i)=>{
                    var arr = [...items]
                    var day = '';
                    var Time = [];
                    for (var i=0;i<arr[0].length;i++){
                        day = arr[0][i]['Day']
                       if(arr[0].length!=0){
                           Time.push([arr[0][i]['StartTime'],arr[0][i]['EndTime'],arr[0][i]['_id']])
                       }
                    }
                    return(
                        <div className='mt-4 col-12 p-1 container'>
                        <div className='gallery m-auto' >
                        
                        <p><strong className='text-info'>{day}</strong></p>
                        <p>{
                                Time.map((time,j)=>{
                                    return(
                                        <>
                                         <p onClick={()=>del(time[2])} className='position-absolute trash'><BsFillTrashFill/></p>
                                         <p> Slot {j+1} - From : <strong>{time[0]}</strong>  To : <strong>{time[1]}</strong></p>
                                        </>
                                    )
                                })
                            } </p>
                         
                        </div>
                        </div>
                    )
                    
                })
            }
            
            </div>
            <div >
                <BsPlusCircle data-toggle="modal" data-target="#exampleModalLong"  className='addSchedule mt-5'/>
            </div>
            
            <div className='mb-5'>
               <strong>Add your work timings</strong>
            </div>
            </div>
        </>
    )
}

export default Schedule;