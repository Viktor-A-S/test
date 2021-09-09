import React from 'react';
import './item.css';

const Item =  ( { col, id, title, checked, onItemSelect, onItemClick } ) => {
    
    const left = col === "left" ? "" : <button className="btn btn-secondary"    onClick={ ()=> onItemClick(-id )}>Left</button>
    const right = col === "right" ? "": <button className="btn btn-secondary"   onClick={ ()=> onItemClick( id )}>Right</button>

    const item = <li className="item-list list-group item-box" key = { id }>
                    <input  type        = "checkbox" 
                            className   = "item-check" 
                            checked     = { checked }
                            onClick     = { () => onItemSelect( id )}></input>
                    <div className="item-text mt-3 ms-3"><h4>{ title }</h4></div>
                    <div className="btn-group me-2 item-buttons">
                        {left}
                        {right}
                    </div>
                </li>

    return (
        <ul className="list-group-item p-1">
            {item}
        </ul>
    )
}

export default Item;