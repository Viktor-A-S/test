import React , {Component}      from 'react'
import Item                     from '../item'
import  './item-cont.css';

class ItemCont  extends Component {

    state = {
        selectedList: []
    }

    onItemSelect = id => {
        const idx = this.state.selectedList.findIndex( it => it === id )
        const selectedList = idx < 0 
                ? [...this.state.selectedList, id] 
                : [...this.state.selectedList.slice( 0, idx ), ...this.state.selectedList.slice( idx + 1 )]
        this.setState ({
            selectedList : selectedList
        })
    }

    onSelectedAll = ( e, data ) => {
        const selectedList = e.target.checked ? data.map( it => { return it.id } ) : []
        this.setState ({
            selectedList : selectedList
        })
    }

    onMoveAll = ( id, fx ) => {
        fx( id, this.state.selectedList )
        this.setState ({
            selectedList : []
        })
    }

    render() {
        const { col, data, onItemClick, onMoveAll} = this.props
        const { selectedList } = this.state
        const left =    col === "left"  ? "" :   <button  onClick = { () => this.onMoveAll( -1, onMoveAll )}>LEFT</button>
        const right =   col === "right" ? "" :   <button  onClick = { () => this.onMoveAll( 1, onMoveAll )}>RIGHT</button>

        return (
            <div> 
                <div className = "header-name">
                    <input 
                        type        = "checkbox" 
                        className   = "header-checkbox"
                        checked     = { selectedList.length === data.length && data.length > 0 }
                        onChange    = { e => this.onSelectedAll( e, data ) }
                    />
                    <div className = "col-header"> COL {col.toUpperCase()} </div>
                    <div className = "header-buttons">
                        {left}
                        {right}
                    </div>
                </div>
                <ul className="list-group-item p-1">
                    { data.map( item  => { return (
                        <Item 
                            col             = { col } 
                            id              = { item.id } 
                            title           = { item.title } 
                            checked         = { selectedList.includes(item.id) } 
                            onItemClick     = { onItemClick }
                            onItemSelect    = { this.onItemSelect }
                        />)
                    })}
                </ul>
            </div>
        )
    }
}

export default ItemCont;