'use strict';

import Reflux from "reflux";
import Actions from "./actions";

const OnlineMeteringStore = Reflux.createStore({

  init() {
    this.listenTo(Actions.addUsage, this.onAddUsage);
    this.usage = [0];
    let date = new Date();
    this.tickValues = [date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()];
  },

  onAddUsage(value) {
    console.log('from store', value);
    let date = new Date();
    this.usage[this.usage.length - 1] = value;
    this.tickValues[this.tickValues.length - 1] = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    this.usage.push(0);
    this.tickValues.push(date.getHours() + ':' + date.getMinutes() + ':' + (date.getSeconds() + 3));

    if (this.usage.length > 25) {
      this.usage = this.usage.slice(1);
      this.tickValues = this.tickValues.slice(1);
    }
    this.trigger({
      usage: this.usage,
      tickValues: this.tickValues
    })
  }

});

export default {OnlineMeteringStore};
