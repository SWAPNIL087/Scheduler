import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = ()=>{
    
    return(
        <>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <NavLink className="navbar-brand font-weight-bold nav-link" to="/">CoinedOne</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto mr-5">
                
                <li className="nav-item">
                    <NavLink className="nav-link" to="/addSchedule">Add Schedule +</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/">Settings</NavLink>
                </li>
                </ul>
            </div>
            </nav>
        </>
    )
}

export default Navbar