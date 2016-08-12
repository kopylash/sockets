'use strict';

import socketIOClient from "socket.io-client";
import sailsIOClient from "sails.io.js";
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";
import Radium from "radium";
import Constants from "constants";
import Homepage from "./homepage";
import AuthActions from "Auth/actions";
import AuthStore from "Auth/stores";

//initialize socket
global.io = sailsIOClient(socketIOClient);
io.sails.url = Constants.apiURL;
io.sails.reconnection = false;

var App = React.createClass({

  componentDidMount() {
    console.log('app mounted');
    AuthActions.signin('vladik.kopilash@gmail.com', 'qwerty');
  },

  render() {
    return (
      <div>
        Hello world!
        {this.props.children}
      </div>
    );
  }
});


var routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Homepage}/>

    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById("content"));


export default Radium(App);
