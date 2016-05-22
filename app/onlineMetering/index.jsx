'use strict';

var LineChart = require("react-chartjs").Line;

import React from "react";
import Reflux from "reflux";
import {OnlineMeteringStore} from "./stores";

const OnlineMetering = React.createClass({

  mixins: [
    Reflux.listenTo(OnlineMeteringStore, "onDataChange")
  ],

  getInitialState() {
    return {
      usage: [],
      tickValues: []
    }
  },

  onDataChange(data) {
    this.setState({
      usage: data.usage,
      tickValues: data.tickValues
    })
  },

  render() {
    return (

      <LineChart data={{
          labels: this.state.tickValues,
          datasets: [
            {
              label: "Online metering",
              fillColor: "rgba(71,191,189,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: this.state.usage
            }
          ]
        }} width="960" height="500"
      />
    )
  }

});


export default (OnlineMetering);


var chartOptions = {

  ///Boolean - Whether grid lines are shown across the chart
  scaleShowGridLines: true,

  //String - Colour of the grid lines
  scaleGridLineColor: "rgba(0,0,0,.05)",

  //Number - Width of the grid lines
  scaleGridLineWidth: 1,

  //Boolean - Whether to show horizontal lines (except X axis)
  scaleShowHorizontalLines: true,

  //Boolean - Whether to show vertical lines (except Y axis)
  scaleShowVerticalLines: true,

  //Boolean - Whether the line is curved between points
  bezierCurve: true,

  //Number - Tension of the bezier curve between points
  bezierCurveTension: 0.4,

  //Boolean - Whether to show a dot for each point
  pointDot: true,

  //Number - Radius of each point dot in pixels
  pointDotRadius: 4,

  //Number - Pixel width of point dot stroke
  pointDotStrokeWidth: 1,

  //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
  pointHitDetectionRadius: 20,

  //Boolean - Whether to show a stroke for datasets
  datasetStroke: true,

  //Number - Pixel width of dataset stroke
  datasetStrokeWidth: 2,

  //Boolean - Whether to fill the dataset with a colour
  datasetFill: true,

  //String - A legend template
  legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>",

  //Boolean - Whether to horizontally center the label and point dot inside the grid
  offsetGridLines: false
};

