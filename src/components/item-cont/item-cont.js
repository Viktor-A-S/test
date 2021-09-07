import React , {Component}      from 'react';
import Item                     from '../item'
import './item-cont.css';

class ItemCont  extends Component {

    state = {
        selectedList: []
    }

    onItemSelect = (id) => {
        const idx = this.state.selectedList.findIndex(it => it === id)
        const selectedList = idx < 0 
                ? [...this.state.selectedList, id] 
                : [...this.state.selectedList.slice(0,idx), ...this.state.selectedList.slice(idx + 1)]
        this.setState ({
            selectedList : selectedList
        })
    }

    onSelectedAll = (e, data) => {

        const selectedList = e.target.checked ? data.map((it) => {return it.id }) : []
        this.setState ({
            selectedList : selectedList
        })
    }

    onMoveAll = (id, fx) => {
        fx(id, this.state.selectedList)
        this.setState ({
            selectedList : []
        })
    }

    block = (data, key, index, onItemClick, onMoveAll) => {
        const { selectedList } = this.state
        const left = key     === "left"  ? "" :   <button  onClick = { ()=> this.onMoveAll(-1, onMoveAll)}>LEFT</button>
        const right = key    === "right" ? "" :   <button  onClick = { ()=> this.onMoveAll(1, onMoveAll)}>RIGHT</button>

        return (
            <div className="col-md-4" key = {index}> 
                <div className="header-name">
                <input type="checkbox" 
                    className = "header-checkbox"
                    //checked = {selectedList.length != 0}
                    //onClick={ ()=> this.onSelectedAll(data[key]) }
                    onChange={(e)=> this.onSelectedAll(e, data[key])}
                />
                <div className="col-header">COL {index + 1}</div>
                <div className = "header-buttons">
                    {left}
                    {right}
                </div>
            </div>
                <Item 
                    itemList        = { data[key]} 
                    column          = { key} 
                    selectedList    = { selectedList }
                    onItemClick     = { onItemClick}
                    onItemSelect    = { this.onItemSelect}
                />
            </div>
        )
    }

    render() {
        const { data, keys, onItemClick, onMoveAll} = this.props

        return (
            <div className="row d-flex justify-content-center bd-highlight">
                {keys.map((item, index) => {
                    return (
                        this.block(data, item, index, onItemClick, onMoveAll)
                    )
                })}
            </div>
        )
    }
}

export default ItemCont;