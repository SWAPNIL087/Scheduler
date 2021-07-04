import React, { useState } from 'react';
import Work from './workTime';
import NonWork from './NonWorkTime';
import { useHistory } from 'react-router-dom';

const Home = ()=>{

    const history = useHistory()

    const worktime=()=>{

        var element = document.getElementsByClassName('worktime');
        element[0].classList.remove("d-none");
        
        var element2 = document.getElementsByClassName('nonworktime');
        element2[0].classList.add("d-none");
        
        var btn = document.getElementsByClassName('workbtn')
        btn[0].classList.remove("btn-light")
        btn[0].classList.add("btn-primary")

        var btn2 = document.getElementsByClassName('nonworkbtn')
        btn2[0].classList.remove("btn-primary")
        btn2[0].classList.add("btn-light")

    }

    const nonworktime=()=>{

        var element = document.getElementsByClassName('worktime');
        element[0].classList.add("d-none");

        var element2 = document.getElementsByClassName('nonworktime');
        element2[0].classList.remove("d-none");

        var btn = document.getElementsByClassName('nonworkbtn')
        btn[0].classList.remove("btn-light")
        btn[0].classList.add("btn-primary")

        var btn2 = document.getElementsByClassName('workbtn')
        btn2[0].classList.remove("btn-primary")
        btn2[0].classList.add("btn-light")
        
    }
    return(
        <>
        <h1>Restrictions</h1>
        <div className='row m-0'>
            
            <div className='col-12 mt-4'>
                <button onClick={worktime} className='btn workbtn btn-primary float-left ml-5'>Work Time</button>
                <button onClick={nonworktime} className='btn nonworkbtn btn-light float-left'>Non-Work Time</button>
            </div>
            <div className='col-12 mt-5 worktime'>
                    <Work/>
            </div>
            <div className='col-12 mt-5 nonworktime d-none'>
                    <NonWork/>
            </div>
        </div>
       
        </>
    )
}

export default Home