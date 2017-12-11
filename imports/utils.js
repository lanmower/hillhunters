import Distance from 'gps-distance';



const getArrayPoints = (tracking)=>{
  const arraypoints = [];
  for(const coordIndex in tracking) {
    const coord = tracking[coordIndex];
    coord.time = coord.timestamp;
    arraypoints.push([coord.latitude, coord.longitude]);
  }
  return arraypoints;
}

const coordtoxy = ({longitude, latitude}) => {
  return [((1/360.0) * (180 + longitude)),((1/180.0) * (90 - latitude))];
}

const normalizearray = (xy) => {
  let min = [1,1];
  let max = [0,0];
  for(const xyIndex in xy) {
    const val = xy[xyIndex];
    if(val[0]<min[0]) min[0] = val[0];
    if(val[1]<min[1]) min[1] = val[1];
    if(val[0]>max[0]) max[0] = val[0];
    if(val[1]>max[1]) max[1] = val[1];
  }
  for(const xyIndex in xy) {
    const size = [max[0]-min[0], max[1]-min[1]];
    xy[xyIndex][0] = (xy[xyIndex][0]-min[0])*(1/size[0]);
    xy[xyIndex][1] = (xy[xyIndex][1]-min[1])*(1/size[1]);
  }
}

const trackingtoxy = (doc) => {
  const xy = [];
  console.log(doc);
  
  for(const trackingIndex in doc.tracking) {
    const val = coordtoxy(doc.tracking[trackingIndex]);
    xy.push(val);
  }
  normalizearray(xy);
  return xy;
}

const xyarraytoobject = (xy) => {
  const obj = {};
  for(let index in xy) {
    obj[index] = {};
    obj[index].x = xy[index][0];
    obj[index].y = xy[index][1];
  }
  return obj;
}

const getDistance = (data)=>{
  return Distance(getArrayPoints(data));
}

export default {
    trackingtoxy,
    normalizearray,
    coordtoxy,
    getArrayPoints,
    xyarraytoobject,
    getDistance
};