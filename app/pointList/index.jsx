'use strict';

import React from "react";
import List from 'material-ui/lib/lists/list';
import EnergyPoint from "./components/energyPoint";

const PointList = React.createClass({



  render() {
    return (
      <List>
        <EnergyPoint name="Kitchen" active={true}/>
        <EnergyPoint name="TV" active={false}/>
        <EnergyPoint name="Bedroom" active={false}/>
        <EnergyPoint name="Heater" active={true}/>
        <EnergyPoint name="PS2" active={false}/>
      </List>
    )
  }

});


export default (PointList);
