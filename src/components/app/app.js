import React, { Component }   from 'react'
import {  BrowserRouter as Router, 
          Route, 
          Link, 
          Redirect}           from 'react-router-dom'
import { connect }            from 'react-redux'
import { withService }        from '../hoc' 
import ItemCont                   from '../item-cont'
import Item                   from '../item'
import Tabs                   from '../tabs'
import Grid                   from '../grid'
import { fetchData, onMoveItem  }    from '../../actions';
import    './app.css';

class App extends Component {

  componentDidMount() {
    this.props.fetchData()    
  }

  state = {
    selectedList: []
  }
  
  getKeys = data => Object.keys(this.props.data);

  getId = id => {
    return ((id < 0 && id != 0) ? id * -1 : id )
  }

  onMoveItem = (id) => {
    this.props.onMoveItem({id})
  };

  onMoveAll = (dir, list) => {
    list.map((it) => {
      const id = it * dir
      this.props.onMoveItem({id})
    })
  };

  onSelectedAll = (e, data) => {

    const selectedList = e.target.checked ? data.map((it) => {return it.id }) : []
    this.setState ({
        selectedList : selectedList
    })
}

  render () {
    const { data } = this.props

    if ( !data ) 
      return <div> LOADING !!!</div>;

    return (
      <div className="d-flex justify-content-center flex-column main">
        <div>
          <div className="header-main d-flex col-md-12 ms-2"></div>
        </div>


        <ItemCont 
            data = {data} 
            onItemClick={this.onMoveItem}
            onMoveAll={this.onMoveAll}
            keys = {this.getKeys()}
          />
        
        <Router>

          <div className="header d-flex">
            <input type="checkbox" 
                  className = "header-checkbox"
                  onChange={(e)=> this.onSelectedAll(e, data["left"])}
              />
            <ul className="d-flex">
              {this.getKeys().map(item => {
                return (
                  <li>
                    <Link 
                      to = {`/${item}`} 
                      key = {item}
                      >
                      { item.toUpperCase() }
                    </Link>
                  </li>
                )
              })}
            </ul>
            <button  onClick = { ()=> this.onMoveAll(-1, data[this.getKeys()])}>LEFT</button>
            <button  onClick = { ()=> this.onMoveAll(1, data[this.getKeys()])}>RIGHT</button>
          </div>


          {/* <Grid 
            data        = {data}
            itemList    = {data[0]} 
            col         = {"left"} 
            //selectedList = {[]}
            onItemClick = {this.onMoveItem}
          /> */}
          

          {this.getKeys().map((item, idx) => {
            return (
              <Route path = {`/${item}`}
                render = {() => {
                  return (
                    <div>
                      <Grid 
                        data        = {data}
                        itemList    = {data[item]} 
                        col         = {item} 
                        selectedList = {[]}
                        onItemClick = {this.onMoveItem}
                      />
                    </div>
                  )
                }}
              />
            )
          })}

          <Route path="/"  render= {() => {return <Redirect to={`/${this.getKeys()[0]}`} />}} />
        </Router>
      </div>
    )
  }
}


const mapStateToProps = ({...props}) => ({...props})

const mapDispatchtoProps = ( dispatch, {withService}) =>  {
  return {
    fetchData: fetchData( withService, dispatch ),
    onMoveItem: props => dispatch( onMoveItem( props ))
  }
}

export default withService()(connect(mapStateToProps, mapDispatchtoProps)(App))
