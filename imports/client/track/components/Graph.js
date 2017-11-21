import React from 'react';
import Axis from './Axis';
export default class Graph extends React.Component {
  render() {
    let lines = 'M '+this.props.data[0][0]+' '+this.props.data[0][1];
    this.props.data.map(xy => {
      const x = xy[0]*100;
      const y = xy[1]*100;
      lines = lines + ' l '+x+' '+y;
    })        
    return (
      <svg style={{width:'150px', height:'150px'}}>
                <path 
                    id="line"
                    d={lines}
                    stroke="lightblue"
                    strokeWidth="3"
                    fill="none"
                />
      </svg>
    )
  }
}