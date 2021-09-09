import React, { Component }   from 'react'
import {  BrowserRouter as Router, 
          Route, 
          Redirect,
          Switch}             from 'react-router-dom'
import { connect }            from 'react-redux'
import { withService }        from '../hoc' 
import ItemCont               from '../item-cont'
import Tabs                   from '../tabs'
import { fetchData, onMoveItem  }    from '../../actions';
import    './app.css';

class App extends Component {

  componentDidMount() {
    this.props.fetchData()    
  }
  
  getKeys = () => {
    return Object.keys(this.props.data);
  }

  onMoveItem = id => {
    this.props.onMoveItem( { id } )
  };

  onMoveAll = ( dir, list ) => {
    list.map((it) => {
      const id = it * dir
      this.props.onMoveItem({id})
    })
  };

  render () {
    const { data } = this.props

    if ( !data  ||  this.getKeys().length == 0) 
      return <div> LOADING !!!</div>;

    return (
      <div className="d-flex justify-content-center flex-column main">
        <div>
          <div className="header-main d-flex col-md-12 ms-2"></div>
        </div>
        <div className="row d-flex justify-content-center bd-highlight">
          {
            this.getKeys().map(( key ) => { return (
              <div className="col-md-4" >
                <ItemCont 
                    col         = { key}
                    data        = { data[ key ] } 
                    onItemClick = { this.onMoveItem }
                    onMoveAll   = { this.onMoveAll }
                />
              </div>
              )
            }
          )}
        </div>

        <Switch>
          <Route  path="/:page"
                  render={({ match: { params: { page }}}) =>
                    <div>
                        <Tabs keys = { this.getKeys() }  page = { page }/>
                        <div className="col-md-12" > 
                          <ItemCont 
                            col           =   { page }
                            data          =   { data[ page ] } 
                            onItemClick   =   { this.onMoveItem }
                            onMoveAll     =   { this.onMoveAll }
                          />
                        </div>
                    </div>
                  }
          />
          <Redirect to = {`/${this.getKeys()[0]}`} />
        </Switch>
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
