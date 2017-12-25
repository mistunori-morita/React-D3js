import React, { Component } from 'react';
import * as d3 from "d3";
import ReactFauxDOM from 'react-faux-dom';

class BarChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:props.data
    }
  }


  static defaultProps = {
    height:500,
    width:500,
    chartBg: '#f4f4f4',
    barColor: 'steelBlue',
    barWidth: 40,
    barOffset: 5
  }
  render() {
      const chart = ReactFauxDOM.createElement('div');

      d3.select(chart).append('svg')
        .attr('width',this.props.width)
        .attr('height',this.props.height)
        .style('background',this.props.chartBg)
        .selectAll('rect')
        .data(this.state.data)
        .enter().append('rect')
          .style('fill',this.props.barColor)
          .attr('width', this.props.barWidth)
          .attr('height', (d) => {
            return d;
          })
          .attr('x', (d, i) => {
            return i * (this.props.barWidth + this.props. barOffset)
          })
          .attr('y', (d) => {
            return this.props.height - d;
          })

      return chart.toReact();
    }

}

export default BarChart;
