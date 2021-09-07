import React from 'react';
import {  BrowserRouter as Router, 
    Route, 
    Link, 
    Redirect,
    useLocation}            from 'react-router-dom'
import './tabs.css';

const Tabs =  ({data, keys}) => {
    return (
        keys.map(item => {
            <div className="header d-flex">
                <ul className="d-flex">
                {this.getKeys().map(item => {
                    return (
                    <li className = ""><Link 
                        // className = {() => { 
                        //   return useLocation() == item ? "active" : "" 
                        // }}
                        to = {`/${item}`} 
                        key = {item}>
                        { item.toUpperCase() }
                    </Link></li>
                    )
                })}
                </ul>
            </div>
        })
    )
}

export default Tabs;