'use strict';

var DoughnutChart = require("react-chartjs").Doughnut;
var Chart = require('chartjs');

import React from "react";
import Reflux from "reflux";
import {DailyPieStore} from "./stores";

const DailyPie = React.createClass({

  mixins: [
    Reflux.listenTo(DailyPieStore, "onDataChange")
  ],

  getInitialState() {
    return {}
  },

  onDataChange(data) {

  },

  render() {
    return (
      <DoughnutChart data={data} chartOptions={chartOptions} width="300" height="300"/>
    )
  }

});

export default (DailyPie);

var chartOptions = {
  datasetFill: true,
  animatable: true,
  segmentShowStroke: true,
  segmentStrokeColor: "#fff",
  segmentStrokeWidth: 2,
  percentageInnerCutout: 0,
  animationSteps: 100,
  animationEasing: "easeOutBounce",
  animateRotate: true,
  legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
};

const data = [
  {
    value: 25,
    label: 'Kitchen',
    color: '#FF6384'
  },
  {
    value: 10,
    label: 'Bedroom',
    color: '#36A2EB'
  },
  {
    value: 30,
    label: 'Heater',
    color: '#FFCE56'
  },
  {
    value: 35,
    label: 'TV',
    color: '#66BB6A'
  }
];
