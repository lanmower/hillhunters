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
import Polyline from 'react-polyline';
import ReactDOMServer from 'react-dom/server';
import Distance from 'gps-distance';
import utils from '/imports/utils.js';

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

const renderTrack = ({doc, match, history, loading}) => {
  const {formgroupstyle, formlabelstyle, containerstyle} = Meteor;
  const age = Moment(doc.startTime).fromNow();
  const xy = xyarraytoobject(utils.trackingtoxy(doc));
  const lastTime = doc.tracking[doc.tracking.length-1].timestamp;

  const dist = Distance(utils.getArrayPoints(doc.tracking));
  
  const time = Moment(lastTime).diff(doc.startTime);
  const ms = Moment.duration(time).as('milliseconds');
  const avgspeed = dist/(ms/3600000)
  const formattedTime = Moment.utc(ms).format("HH:mm:ss.SSS");

  return (doc ? (
  <div className="ViewTrack">
    <Navigation title={"View track"} loading={loading} />

    <div style={containerstyle}>
      <Polyline
        coordinates={xy}
        style="5px solid orange"
        closed={false}
      />
      <Graph data={xy}/>
      <div><div style={{fontWeight: "bold"}}>Tracked</div> {age}</div>
      <div><div style={{fontWeight: "bold"}}>Distance</div> {Math.round(dist*1000)} meters</div>
      <div><div style={{fontWeight: "bold"}}>Time</div>{formattedTime}</div>
      <div><div style={{fontWeight: "bold"}}>Points</div>{doc.tracking.length}</div>
      <div><div style={{fontWeight: "bold"}}>Avg speed</div>{avgspeed}</div>
      <div><div style={{fontWeight: "bold"}}>Deck</div> {doc.deck.name}</div>
    </div>
  </div>
) : <NotFound />);
};

const ViewTrack = ({ loading, doc, match, history }) => (
  renderTrack(doc, match, history)
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
    doc: doc
  };
}, renderTrack);
