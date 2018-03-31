import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Skates from '/imports/api/Skates/Skates';
import NotFound from '../../page/pages/NotFound';
import Loading from '../../page/components/Loading';
import Navigation from '../../page/components/Navigation';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Moment from 'moment';
import ReactDOMServer from 'react-dom/server';
import Distance from 'gps-distance';
//import Graph from '../components/Graph';
import utils from '/imports/utils.js';

const handleRemove = (skateId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('skates.remove', skateId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Skate deleted!', 'success');
        history.push('/skates');
      }
    });
  }
};

const renderSkate = ({doc, match, history, loading}) => {
  const {formgroupstyle, formlabelstyle, containerstyle} = Meteor;
  const age = Moment(doc.startTime).fromNow();
  const xy = utils.skateingtoxy(doc);
  const lastTime = doc.skateing[doc.skateing.length-1].timestamp;

  const dist = Distance(utils.getArrayPoints(doc.skateing));
  
  const time = Moment(lastTime).diff(doc.startTime);
  const ms = Moment.duration(time).as('milliseconds');
  const avgspeed = dist/(ms/3600000)
  const formattedTime = Moment.utc(ms).format("HH:mm:ss.SSS");

  return (doc ? (
  <div className="ViewSkate">
    <Navigation title={"View Skate"} loading={loading} />

    <div style={containerstyle}>
      <Graph data={xy}/>
      <div><div style={{fontWeight: "bold"}}>Skateed</div> {age}</div>
      <div><div style={{fontWeight: "bold"}}>Distance</div> {Math.round(dist*1000)} meters</div>
      <div><div style={{fontWeight: "bold"}}>Time</div>{formattedTime}</div>
      <div><div style={{fontWeight: "bold"}}>Points</div>{doc.skateing.length}</div>
      <div><div style={{fontWeight: "bold"}}>Avg speed</div>{avgspeed}</div>
      <div><div style={{fontWeight: "bold"}}>Deck</div> {doc.deck.name}</div>
    </div>
  </div>
) : <NotFound />);
};

const ViewSkate = ({ loading, doc, match, history }) => (
  renderSkate(doc, match, history)
);

ViewSkate.propTypes = {
  loading: PropTypes.bool.isRequired,
  doc: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const skateId = match.params._id;
  const doc = Skates.findOne(skateId);
  return {
    doc: doc
  };
}, renderSkate);
