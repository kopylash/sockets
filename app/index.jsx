'use strict';

/*
 React
 */
var React = require('react'),
  ReactDOM = require('react-dom'),
  Radium = require('radium'),
  Actions = require('./core/actions'),
  Stores = require('./core/stores');
/*
 Router
 */
var ReactRouter = require('react-router'),
  Router = ReactRouter.Router,
  Route = ReactRouter.Route,
  IndexRedirect = ReactRouter.IndexRedirect,
  IndexRoute = ReactRouter.IndexRoute,
  History = ReactRouter.History,
  Policy = require('./policy');
/*
 Components
 */
var ModalWindow = require('./core/components/modalWindow'),
  Loader = require('./core/components/loader'),
  PopoverWindow = require('./core/components/popoverWindow'),
  PageLogin = require('./modules/sms-auth').PageLogin,
  StoreList = require('./modules/stores').StoreList,
  UserList = require('./modules/userList').UserList,
  MainScreen = require('./core/components/mainScreen'),
  Metrics = require('./modules/metrics').Metrics;

var App = React.createClass({

  mixins: [History],

  getInitialState: function () {

    return {
      loader: false,
      modalWindow: {opened: false, okHandler: null, cancelHandler: null}
    };
  },

  componentWillMount: function () {
    Actions.ActionsAuth.checkAuth();
  },

  componentDidMount: function () {
    Actions.ActionsLocation.startWatchPosition();

    this.auth = Stores.StoreAuth.listen((function (auth) {
      if (!auth) {
        this.history.pushState(null, 'login');
      }
      else {
        this.history.pushState(null, 'main');
      }
    }).bind(this));

    this.location = Stores.StoreLocation.listen((function (res) {
      // if code.error = 1, then no permissions in browser and we must show it.
      if (res.error && res.error.code === 1) {
        Actions.ActionsModal.setShow(this, 'Need permission to take coordinates', null, null);
      }
    }).bind(this));

    //Listening "modal Window" Store and if inside something changed we change state of index component
    this.modal = Stores.StoreModal.listen((function (context, opened, content, okHandler, cancelHandler) {
      this.setState({
        modalWindow: {
          context: context,
          opened: opened,
          content: content,
          okHandler: okHandler,
          cancelHandler: cancelHandler
        }
      });
    }).bind(this));
  },

  componentWillUnmount: function () {
    this.auth();
    this.location();
    this.modal();
    Actions.ActionsLocation.stopWatchPosition();
  },

  render: function () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});


var routes = (
  <Router>
    <Route path="/" component={App} >
      <Route path="login" component={PageLogin} onEnter={Policy.checkPermissions.bind(null, {auth: false})} />
      <Route path="main" component={MainScreen} onEnter={Policy.checkPermissions.bind(null, {auth: true})} >
        <IndexRedirect to="metrics" />
        <Route path="metrics" component={Metrics} />
        <Route path="stores" component={StoreList} />
        <Route path="users">
          <IndexRoute component={UserList} />
          <Route path=":userId/stores" component={StoreList} />
        </Route>
        <Route path="map" />
      </Route>
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById("content"));


module.exports = Radium(App);
