import React, { Component }   from 'react';
import {  BrowserRouter as Router, 
          Route, 
          Link, 
          Redirect}           from 'react-router-dom';
import Item                   from '../item';
import './app.css';

export default class App extends Component {

  state = {
    left: [
        {id: 0, title: 'Left 0'},
        {id: 1, title: 'Left 1'},
        {id: 2, title: 'Left 2'},
    ],
    middle: [
        {id: 3, title: 'Middle 0'},
        {id: 4, title: 'Middle 1'},
        {id: 5, title: 'Middle 2'},
    ],
    right: [
        {id: 6, title: 'Right 0'},
        {id: 7, title: 'Right 1'},
        {id: 8, title: 'Right 2'},
    ]
  }

  keys = Object.keys(this.state);

  getKey = id => {
    let cur = {key : null, objIdx : null, iIdx : null}
    this.keys.forEach((key, index)=> {
      var idx = this.state[key].findIndex(el => el.id === this.getId(id));
      if(idx > -1) {
        cur.key = key
        cur.oIdx = index  //object index
        cur.iIdx = idx    //item index
        return
      }
    })
    return cur;
  }

  getId = id => {
    return ((id < 0 && id != 0) ? id * -1 : id )
  }

  onMoveItem = (id, dir, col) => {
      const data = this.state;
      const cur = this.getKey(id);
      const toLeft = (Object.is(id, -0)) || Math.sign(id) == -1
      const toKey = this.keys[cur.oIdx + (toLeft ? -1 : 1)]

      this.setState({
        [`${toKey}`]: [...data[toKey], data[cur.key][cur.iIdx]],
        [`${cur.key}`] : [...data[cur.key].slice(0, cur.iIdx), ...data[cur.key].slice(cur.iIdx+1)]
      })
  };

  render () {
    const numb = 1;
    return (
      <div className="d-flex justify-content-center flex-column main">
        <div>
          <div className="header-main d-flex col-md-12 ms-2"></div>
        </div>

        <div className="row d-flex justify-content-center bd-highlight">
          {this.keys.map((item, index) => {
            return (
              <div className="col-md-4"> 
                <div className="col-header">COL {index + 1}</div>
                <Item itemList = {this.state[item]} column={item} onItemClick={this.onMoveItem}/>
              </div>
            )
          })}
        </div>
        
        <Router>
          <div className="header d-flex">
            <ul className="d-flex">
              {this.keys.map(item => {
                return (
                  <li ><Link to = {`/${item}`}>
                    {item.toUpperCase()}
                  </Link></li>
                )
              })}
            </ul>
          </div>

          <Route path="/"  render= {() => {return <Redirect to={`/${this.keys[0]}`} />}} />

          {this.keys.map(item => {
            return (
              <Route path = {`/${item}`}
                render= {() => {
                  return <Item 
                    itemList = {this.state[item]} 
                    column={item} 
                    onItemClick={this.onMoveItem}/>}}
              />
            )
          })}

        </Router>
      </div>
    );
  }
}
