import React, {Component}      from 'react'
import                          './item.css'

const moveDefault = () => {}

class Item extends Component  {
    
    static defaultProps = {
        onMoveLeft:     moveDefault,
        onMoveRight:    moveDefault
    }

    render () {
        const { id, title, checked, onItemSelect, onMoveItem, onMoveLeft, onMoveRight } = this.props
    
        const leftB = onMoveLeft === moveDefault   ? null : <button className="btn btn-secondary" onClick={ () => onMoveItem(-id) }>Left</button>
        const rightB = onMoveRight === moveDefault ? null : <button className="btn btn-secondary" onClick={ () => onMoveItem(id) }>Right</button>   
    
        const item = <li className="item-list list-group item-box" key={ id }>
                        <input  type        = "checkbox" 
                                className   = "item-check" 
                                checked     = { checked }
                                onChange    = { () => onItemSelect(id) } />
                        <div className="item-text mt-3 ms-3">
                            <h4>{ title }</h4>
                        </div>
                        <div className="btn-group me-2 item-buttons">
                            { leftB }
                            { rightB }
                        </div>
                    </li>

        return (
            <ul className="list-group-item p-1">
                { item }
            </ul>
        )
    }
}

export default Item