import React from 'react';
import './item.css';

const Item =  ({itemList, column, selectedList, onItemClick, onItemSelect}) => {
    const list =  itemList.map(({id, title}) => {

        const left = column === "left" ? "" : <button className="btn btn-secondary" onClick={()=> onItemClick(-id)}>Left</button>
        const right = column === "right" ? "": <button className="btn btn-secondary" onClick={()=> onItemClick(id)}>Right</button>
        const checkedIt = selectedList.includes(id);
        return (
            <li className="item-list list-group item-box" key={id}>
                <input  type        = "checkbox" 
                        className   = "item-check" 
                        checked     =   {checkedIt}
                        onClick     = { () => onItemSelect(id)}></input>
                <div className="item-text mt-3 ms-3"><h4>{title}</h4></div>
                <div className="btn-group me-2 item-buttons">
                    {left}
                    {right}
                </div>
            </li>
        )
    })

    return (
        <ul className="list-group-item p-1">
            {list}
        </ul>
    )
}

export default Item;