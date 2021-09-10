import React from 'react'

const Buttons =  ({ id, onMoveItem }) => {
    
    const left  = <button className="btn btn-secondary"   onClick={ ()=> onMoveItem( -1 * id ) }>Left</button>
    const right = <button className="btn btn-secondary"   onClick={ ()=> onMoveItem( id ) }>Right</button>

    return (
        <div className="btn-group me-2 item-buttons">
            { left }
            { right }
        </div>
    )
}

export default Buttons;