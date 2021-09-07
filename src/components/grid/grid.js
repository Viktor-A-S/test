import React from 'react';
import {Route, Link}           from 'react-router-dom'
import './grid.css';

const Grid =  ({data, itemList, col, onItemClick}) => {

    if ( !data ) 
      return <div> LOADING !!!</div>;

    const keys = Object.keys(data)
    //const cl =  document.URL.indexOf(item)> -1   ? 'active' : ''

    const header = <div className="header d-flex">
            <input type="checkbox" 
                  className = "header-checkbox"
                  onChange={(e)=> this.onSelectedAll(e, data["left"])}
              />
            <ul className="d-flex">
              {keys.map(item => {
                return (
                  <li className = {() => { 
                        return ( 
                            document.URL.indexOf(item)> -1   ? 'active' : '')
                    }}>
                    <Link 
                      //onClick = {() => {
                        //if ( document.URL.indexOf(item)> -1 )  classNames = 'active'
                      //}}
                      to = {`/${item}`} 
                      key = {item}
                      >
                      { item.toUpperCase() }
                    </Link>
                  </li>
                )
              })}
            </ul>
            <button  onClick = { () => this.onMoveAll(-1, data[keys])}>LEFT</button>
            <button  onClick = { () => this.onMoveAll(1, data[keys])}>RIGHT</button>
          </div>


    const list =  itemList.map(({id, title}) => {

        const left = col === "left" ? "" : <button className="btn btn-secondary" onClick={()=> onItemClick(-id)}>Left</button>
        const right = col === "right" ? "": <button className="btn btn-secondary" onClick={()=> onItemClick(id)}>Right</button>

        return (
            // <Route path = {`/${keys[0]}`}
            //     render = {() => { return (
                    <li className="item-list list-group item-box" key={id}>
                        <input type="checkbox" className="item-check"></input>
                        <div className="item-text mt-3 ms-3"><h4>{title}</h4></div>
                        <div className="btn-group me-2 item-buttons">
                            {left}
                            {right}
                        </div>
                    </li>
                   // )
            //     }}
            // />
        )
    })

    return (
        <div>
            {/* {header} */}
            <ul className="list-group-item p-1">
                {list}
            </ul>
        </div>
    )
}

export default Grid;