'use strict';

import React from 'react';
import Radium from 'radium';
import rd3 from 'react-d3';
import { BarChart } from 'react-d3';

var barData = [
  {
    "name": "Series A",
    "values": [
      { "x": 1, "y":  76},
      { "x": 2, "y":  54},
      { "x": 3, "y":  28},
      { "x": 4, "y":  89},
      { "x": 5, "y":  103}
    ]
  },
  {
    "name": "Series B",
    "values": [
      { "x": 1, "y":  8},
      { "x": 2, "y":  9},
      { "x": 3, "y":  10},
      { "x": 4, "y":  12},
      { "x": 5, "y":  5}
    ]
  },
  {
    "name": "Series C",
    "values": [
      { "x": 1, "y":  28},
      { "x": 2, "y":  39},
      { "x": 3, "y":  0},
      { "x": 4, "y":  11},
      { "x": 5, "y":  0}
    ]
  },
  {
    "name": "Series D",
    "values": [
      { "x": 1, "y":  10},
      { "x": 2, "y":  78},
      { "x": 3, "y":  65},
      { "x": 4, "y":  40},
      { "x": 5, "y":  24}
    ]
  },
  {
    "name": "Series E",
    "values": [
      { "x": 1, "y":  76},
      { "x": 2, "y":  54},
      { "x": 3, "y":  28},
      { "x": 4, "y":  89},
      { "x": 5, "y":  0}
    ]
  },
  {
    "name": "Series F",
    "values": [
      { "x": 1, "y":  47},
      { "x": 2, "y":  66},
      { "x": 3, "y":  11},
      { "x": 4, "y":  54},
      { "x": 5, "y":  94}
    ]
  }
];

var Homepage = React.createClass({

   render: function() {
    return (
      <BarChart
        data={barData}
        width={700}
        height={500}
        fill={'#47bfbd'}
        title='Bar Chart'
      />
    );
  }
});


export default (Homepage);
