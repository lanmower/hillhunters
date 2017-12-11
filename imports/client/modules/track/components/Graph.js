import React from 'react';
function getPolyLineString(data) {
  var lastx = 0;
  var lasty = 0;
  let d = "M " + data[0][0] * 100 + ' ' + data[0][1] * 100;
  for (index in data) {
    const xy = data[index];
    const x = xy[0] * 100;
    const y = xy[1] * 100;
    if (lastx || lasty) {
      d = d + ' ' + "L" + x + ' ' + y
    }
    lastx = x;
    lasty = y;
  };
  return d;
}
function getPolyLine(data) {
  return (<path
    id="line"
    d={getPolyLineString(data)}
    stroke="lightblue"
    strokeWidth="3"
    fill="none"
  />)

}

export default class Graph extends React.Component {
  render() {
    if(this.props) return (
      <svg style={{ width: '150px', height: '150px' }}>
        {getPolyLine(this.props.data)}
      </svg>
    )
  }
}