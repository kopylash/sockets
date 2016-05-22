'use strict';

import React from "react";
import OnlineMetering from "./onlineMetering";

const Homepage = React.createClass({

  render() {
    return (
      <div style={{height:'600px', width: '960px', margin: '10px auto'}}>
        <OnlineMetering />
      </div>
    )
  }

});


export default (Homepage);
