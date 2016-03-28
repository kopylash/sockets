'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import Radium from 'radium';

//components
import Homepage from './homepage'

class App extends React.Component {

  render() {
    return (
      <div>
        Hello world!
        {this.props.children}
      </div>
    );
  }
}


var routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={Homepage} />

    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById("content"));


export default Radium(App);
