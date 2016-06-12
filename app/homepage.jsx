'use strict';

import React from "react";
import OnlineMetering from "./onlineMetering";
import  DailyPie from "./pie";
import EnergyPoint from "./energyPoint";

const Homepage = React.createClass({

  render() {
    return (
      <div style={{width: '960px', margin: '10px auto'}}>
        <div style={{width: '50%', height: '400px', float: 'left'}}>
          <DailyPie/>
        </div>
        <div style={{width: '50%', float: 'left'}}>
          <EnergyPoint name="kitchen" active={true}/>
        </div>
        <div style={{clear:'both'}}></div>
        <div style={{height:'600px', margin: '10px auto'}}>
          <OnlineMetering />
        </div>
      </div>
    )
  }

});


export default (Homepage);
