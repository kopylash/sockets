'use strict';

import Reflux from "reflux";
import Actions from "./actions";

const DailyPieStore = Reflux.createStore({

  init() {
    this.listenTo(Actions.addUsage, this.onAddUsage);
  },

  onAddUsage(value) {

  }

});

export default {DailyPieStore};
