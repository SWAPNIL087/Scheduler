import React, { useState, useEffect } from 'react';
import {GiAbstract086} from 'react-icons/gi';
import {FaPencilAlt} from 'react-icons/fa';

const NonWork = ()=>{

    const [appList,setappList] = useState([])

    const [unblockedapp,setunBlockList] = useState([])

    const [blockedLength,setBL1] = useState()

    const [unblockedLength,setBL2] = useState()

    const [selectid,setid] = useState([])

    const [Timevalue,setvalue] = useState(0)

    const [Timevalue2,setvalue2] = useState(0)

    useEffect(async() => {
        
        console.log('sent the req.')
        const data = await fetch("/blockedApps")
        const res = await data.json()
        setappList(res);
        setBL1(res.length)

        const unblockedapps = await fetch('/unblockedApps')
        const res2 = await unblockedapps.json()
        setunBlockList(res2);
        setBL2(res2.length)

      },[]);

    const edit = async(id)=>{

        console.log(id);
        const data = await fetch('/edittime',{
            method:'POST',
            headers:{'content-Type':'application/json'},
            body: JSON.stringify({id:id,stat:'B'})
        })
        console.log(data)
        console.log('sent the req.')
        const data1 = await fetch("/blockedApps")
        const res = await data1.json()
        setappList(res);
        setBL1(res.length)

        const unblockedapps = await fetch('/unblockedApps')
        const res2 = await unblockedapps.json()
        setunBlockList(res2);
        setBL2(res2.length)

    }

    const settime = async(id,time,time2)=>{
        console.log(id);
        const data = await fetch('/edittime',{
            method:'POST',
            headers:{'content-Type':'application/json'},
            body: JSON.stringify({id:id,time:time,time2:time2})
        })

        var close = document.getElementsByClassName('closemodal');
        close[0].click();

        const data1 = await fetch("/blockedApps")
        const res = await data1.json()
        setappList(res);
        setBL1(res.length)

        const unblockedapps = await fetch('/unblockedApps')
        const res2 = await unblockedapps.json()
        setunBlockList(res2);
        setBL2(res2.length)

    }
    const rangevalue=(e)=>{
        setvalue(e.target.value)
    }
    const rangevalue2=(e)=>{
        setvalue2(e.target.value)
    }


    return(
        <>
        <div className='row'>
            
            
            <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Set Limit</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    
                    <strong className='float-left'>{selectid[1]}</strong>
                    <div className="range mt-5">
                        <input onChange={rangevalue} type="range" className="form-range" min="0" max="5"  step="0.5" id="customRange2" />
                    </div>
                    <p><strong>Weekdays-Time</strong> : {Timevalue} Hrs</p>

                    <div className="range mt-5">
                        <input onChange={rangevalue2} type="range" className="form-range" min="0" max="5"  step="0.5" id="customRange2" />
                    </div>
                    <p><strong>Weekends-Time</strong> : {Timevalue2} Hrs</p>

                    
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary closemodal" data-dismiss="modal">Close</button>
                    <button type="button" onClick={()=>settime(selectid[0],Timevalue,Timevalue2)} className="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
            </div>

            <div className='col-lg-6'>
                <h4>Limited Apps - {blockedLength}</h4>
                <div className='appsList mt-4 m-auto p-4'>
                {appList.map((item)=>{
                        return (
                            <div>
                                <p key={item['_id']}><GiAbstract086 className='symbol'/>
                                    {item['app_name']}
                                    <div onClick={()=>edit(item['_id'])} className="float-right editTime">
                                       {/* <p>Edit <FaPencilAlt/></p> */}
                                       <p id={item['_id']} onClick={()=>setid([item['_id'],item['app_name']])} data-toggle="modal" data-target="#exampleModalLong">Edit <FaPencilAlt/></p>
                                    </div>
                                </p>
                                <p> <strong>Weekdays </strong> - {item['WeekdaysTimer']} hrs <strong>  Weekends </strong> - {item['WeekendsTimer']} hrs</p>
                                <hr/>
                            </div>
                            )
                    })}
                </div>
            </div>
            
            <div className='col-lg-6'>
                <h4>Other Installed apps - {unblockedLength}</h4>
                <div className='appsList mt-4 m-auto p-4'>
                {unblockedapp.map((item)=>{
                        return (
                            <div>
                                <p key={item['_id']}><GiAbstract086 className='symbol'/>{item['app_name']}
                                <div className="custom-control custom-switch float-right">
                                    <button id={item['_id']} onClick={()=>setid([item['_id'],item['app_name']])} class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">setTime</button>
                                </div>
                                </p><hr/>
                            </div>
                            )
                    })}
                </div>
            </div>
        </div>

        </>

    )
}

export default NonWork;