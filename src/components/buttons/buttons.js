import React from 'react';

const Buttons =  ( { id, col, onItemClick } ) => {
    
    const left = col === "left" ? "" : <button className="btn btn-secondary"    onClick={()=> onItemClick(-1 * id)}>Left</button>
    const right = col === "right" ? "": <button className="btn btn-secondary"   onClick={()=> onItemClick( id )}>Right</button>

    return (
        <div className="btn-group me-2 item-buttons">
            {left}
            {right}
        </div>
    )
}

export default Buttons;