import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Tracks from '/imports/api/Tracks/Tracks';
import NotFound from '../../page/pages/NotFound';
import Loading from '../../page/components/Loading';
import Navigation from '../../page/components/Navigation';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Moment from 'moment';
import Graph from '../components/Graph';
import ReactDOMServer from 'react-dom/server';
import Distance from 'gps-distance';
const handleRemove = (trackId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('tracks.remove', trackId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Track deleted!', 'success');
        history.push('/tracks');
      }
    });
  }
};

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
  for(const trackingIndex in doc.tracking) {
    const val = coordtoxy(doc.tracking[trackingIndex]);
    xy.push(val);
  }
  normalizearray(xy);
  return xy;
}

const renderTrack = ({doc, match, history, loading}) => {
  const {formgroupstyle, formlabelstyle, containerstyle} = Meteor;
  console.log(doc);
  const age = Moment(doc.startTime).fromNow();
  const xy = trackingtoxy(doc);
  const lastTime = doc.tracking[doc.tracking.length-1].timestamp;


  const arraypoints = [];
  for(const coordIndex in doc.tracking) {
    const coord = doc.tracking[coordIndex];
    coord.time = coord.timestamp;
    arraypoints.push([coord.latitude, coord.longitude]);
  }
  const dist = Distance(arraypoints);
  const time = Moment(lastTime).diff(doc.startTime);
  const ms = Moment.duration(time).as('milliseconds');
  const formattedTime = Moment.utc(ms).format("HH:mm:ss.SSS");
  const avgspeed = dist/(ms/3600000)

  return (doc ? (
  <div className="ViewTrack">
    <Navigation title={"View track"} loading={loading} />

    <div style={containerstyle}>
      <Graph data={xy}/>
      <div><div style={{fontWeight: "bold"}}>Tracked</div> {age}</div>
      <div><div style={{fontWeight: "bold"}}>Distance</div> {Math.round(dist*1000)} meters</div>
      <div><div style={{fontWeight: "bold"}}>Time</div>{formattedTime}</div>
      <div><div style={{fontWeight: "bold"}}>Avg speed</div>{avgspeed}</div>
      <div><div style={{fontWeight: "bold"}}>Deck</div> {doc.deck.name}</div>
    </div>
  </div>
) : <NotFound />);
};

const ViewTrack = ({ loading, doc, match, history }) => (
  !loading ? renderTrack(doc, match, history) : <Loading />
);

ViewTrack.propTypes = {
  loading: PropTypes.bool.isRequired,
  doc: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const trackId = match.params._id;
  const doc = Tracks.findOne(trackId);
  return {
    loading: !doc,
    doc: doc
  };
}, renderTrack);
