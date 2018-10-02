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

const coordtoxy = (input) => {
  if(!input) return;
  const {latitude, longitude} = input;
  console.log(input);
  return [((1/360.0) * (180 + longitude)),((1/180.0) * (90 - latitude))];
}

const normalizearray = (xy, scale) => {
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
    xy[xyIndex][0] = ((xy[xyIndex][0]-min[0])*(1/size[0]))*scale;
    xy[xyIndex][1] = ((xy[xyIndex][1]-min[1])*(1/size[1]))*scale;
  }
}

const trackingtoxy = (doc, size) => {
  const xy = [];
  console.log(doc);

  for(const trackingIndex in doc.tracking) {
    const val = coordtoxy(doc.tracking[trackingIndex]);
    xy.push(val);
  }
  normalizearray(xy, size);
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

function getDistance(p1, p2) {
    if (p1 && p2) {
        Location.debug && console.log("Getting distance for", p1, p2);
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = rad(p2.coords.latitude - p1.latitude);
        var dLong = rad(p2.coords.longitude - p1.longitude);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.coords.latitude)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d; // returns the distance in meters
    } else {
        // TODO: console log or throw error? Return what here?
        return null;
    }
}

export default {
    trackingtoxy,
    normalizearray,
    coordtoxy,
    getArrayPoints,
    xyarraytoobject,
    getDistance
};
