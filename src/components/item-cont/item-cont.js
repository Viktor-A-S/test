import React, {Component}       from 'react'
import Item                     from '../item'
import Buttons                  from '../buttons'
import                          './item-cont.css'

const moveDefault = () => {}

class ItemCont extends Component {

    state = {
        selectedList: []
    }

    static defaultProps = {
        onMoveLeft:  moveDefault,
        onMoveRight: moveDefault
    }

    onItemSelect = id => {
        const list  = this.state.selectedList
        const idx   = list.findIndex(it => it === id)

        const selectedList = idx < 0 
                ? [...list, id] 
                : [...list.slice(0, idx), ...list.slice(idx+1)]
        this.setState ({ selectedList })
    }

    onSelectedAll = ({ elem, data }) => {
        const selectedList = elem.target.checked ? data.map(it => it.id) : []
        this.setState ({ selectedList })
    }

    onMoveAll = ({ id, fx }) => {
        fx({ dir: id, list: this.state.selectedList })
        this.setState ({
            selectedList: []
        })
    }

    render () {
        const { col, data, onMoveItem, onMoveAll, onMoveLeft, onMoveRight } = this.props
        const { selectedList } = this.state

        const leftB  = onMoveLeft === moveDefault  ? null : <button  onClick={ () => this.onMoveAll({ id: -1, fx: onMoveAll }) }>LEFT</button>
        const rightB = onMoveRight === moveDefault ? null : <button  onClick={ () => this.onMoveAll({ id: 1,  fx: onMoveAll }) }>RIGHT</button>

        const indterm =   data.length > selectedList.length && selectedList.length > 0
        
        return (
            <div> 
                <div className="header-name">
                    <input 
                        type        = "checkbox" 
                        className   = "header-checkbox"
                        checked     = { selectedList.length === data.length && data.length > 0 }
                        onChange    = { elem => this.onSelectedAll({ elem, data }) }
                        ref         = { el => el ? el.indeterminate = indterm : null }
                    />
                    <div className="col-header"> COL { col.toUpperCase() } </div>
                    <div className="header-buttons">
                        {leftB}
                        {rightB}
                    </div>
                </div>
                <ul className="list-group-item p-1">
                    { data.map( item  => { return (
                        <Item 
                            key             = { item.id } 
                            id              = { item.id } 
                            title           = { item.title } 
                            checked         = { selectedList.includes(item.id) } 
                            onMoveItem      = { onMoveItem }
                            onItemSelect    = { this.onItemSelect }

                            onMoveLeft      = { onMoveLeft }
                            onMoveRight     = { onMoveRight }
                        />)
                    }) }
                </ul>
            </div>
        )
    }
}

export default ItemCont