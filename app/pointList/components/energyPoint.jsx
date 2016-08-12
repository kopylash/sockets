'use strict';

import React from "react";
import Toggle from 'material-ui/lib/toggle';

const EnergyPoint = React.createClass({

  getDefaultProps() {
    return {
      name: 'N/A',
      active: false
    }
  },

  render() {
    return (
      <div style={{height: '30px'}}>
        <Toggle
          label={this.props.name}
          defaultToggled={this.props.active}
        />
      </div>
    )
  }

});


export default (EnergyPoint);
