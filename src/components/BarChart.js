import React, { Component } from 'react';

class BarChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: props.data
    }
  }
  render() {
    return (
      <div>
       BARCHART
      </div>
    );
  }
}

export default BarChart;
