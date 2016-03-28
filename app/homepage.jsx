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
      { "x": 1, "y":  76},
      { "x": 2, "y":  54},
      { "x": 3, "y":  28},
      { "x": 4, "y":  89},
      { "x": 5, "y":  103}
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
