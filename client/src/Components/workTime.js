import React, { useState, useEffect } from 'react';
import {GiAbstract086} from 'react-icons/gi'

const Work = ()=>{

    const [appList,setappList] = useState([])

    const [unblockedapp,setunBlockList] = useState([])

    const [blockedLength,setBL1] = useState()

    const [unblockedLength,setBL2] = useState()

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

    const unblock = async(id,name)=>{

        console.log(id);
        window.confirm(`Unblock Confirmation of ${name}`)
        const data = await fetch('/updateStatus',{
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

    const block = async(id,name)=>{
        
        console.log(id);
        window.confirm(`block Confirmation of ${name}`)
        const data = await fetch('/updateStatus',{
            method:'POST',
            headers:{'content-Type':'application/json'},
            body: JSON.stringify({id:id,stat:'A'})
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
    return(
        <>
        <div className='row'>
            <div className='col-lg-6'>
                <h4>Blocked Apps - {blockedLength}</h4>
                <div className='appsList mt-4 m-auto p-4'>
                {appList.map((item)=>{
                        return (
                            <div>
                                
                                <p key={item['_id']}><GiAbstract086 className='symbol'/>
                                    {item['app_name']}
                                    <div className="custom-control custom-switch float-right">
                                        <input type="checkbox" defaultChecked='true' onClick={()=>unblock(item['_id'],item['app_name'])} className="custom-control-input" id={item['_id']}/>
                                        <label className="custom-control-label"  for={item['_id']}>Blocked</label>
                                    </div>
                                </p>
                                
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
                                        <input type="checkbox" onClick={()=>block(item['_id'],item['app_name'])} className="custom-control-input" id={item['_id']}/>
                                        <label className="custom-control-label"  for={item['_id']}>Block</label>
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

export default Work;