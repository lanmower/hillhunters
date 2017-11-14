import React from 'react';
import Axis from './Axis';
export default class Graph extends React.Component {
  render() {
    let i=0;
    let lastx = 0;
    let lasty = 0;

    return (
      <svg style={{width:'150px', height:'150px'}}>
        {this.props.data.map(xy => {
            const x = xy[0]*100;
            const y = xy[1]*100;
            const ret =
                <path 
                    key={i++}
                    id="line"
                    d={'M '+lastx+' '+lasty+' l '+x+' '+y}
                    stroke="lightblue"
                    strokeWidth="3"
                    fill="none"
                />;
            lastx = x;
            lasty = x;
            if(!lastx && !lasty) return;
            return ret;
        })}
      </svg>
    )
  }
}