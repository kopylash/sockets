'use strict';

import Reflux from "reflux";
import Actions from "./actions";

let AuthStore = Reflux.createStore({

  init() {
    this.listenTo(Actions.signin, this.onSignin);
    this.authData = {};
  },

  onSignin(login, password) {
    var credentials = {
      login: login,
      password: password
    };
    console.log(credentials);

    io.socket.post('/auth/signin', credentials, (body, res) => {
      this.authData = body;
      console.log(this.authData);
      io.socket.on('energyUsage', (data)=> {
        console.log('new energy usage: ', data);
      });
      this.trigger(this.authData);
    });
  }

});

export default {AuthStore};
