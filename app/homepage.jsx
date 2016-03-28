'use strict';

import React from 'react';
import Radium from 'radium';
import { BarChart } from 'react-d3';

class Homepage extends React.Component {

  constructor() {
    super();
    this.barData = [
      {label: 'Hall', value: 50},
      {label: 'Kitchen', value: 89},
      {label: 'Room1', value: 43},
      {label: 'Room2', value: 71},
      {label: 'Bathroom', value: 32}
    ];
  }

  render() {
    return <BarChart
      data={barData}
      width={600}
      height={400}
      fill={'#47bfbd'}
      title='Energy consumption'
    />;
  }
}


export default Radium(Homepage);
