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
import Graph from '../components/Graph';
import ReactDOMServer from 'react-dom/server';
import Distance from 'gps-distance';
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
  if(!doc) return null;
  const {formgroupstyle, formlabelstyle, containerstyle} = Meteor;
  const age = Moment(doc.startTime).fromNow();
  const xy = utils.trackingtoxy(doc);
  const lastTime = doc.tracking[doc.tracking.length-1].timestamp;

  const dist = Distance(utils.getArrayPoints(doc.tracking));
  
  const time = Moment(lastTime).diff(doc.startTime);
  const ms = Moment.duration(time).as('milliseconds');
  const avgspeed = dist/(ms/3600000)
  const formattedTime = Moment.utc(ms).format("HH:mm:ss.SSS");

  return <div className="ViewSkate">
    <Navigation title={"View skate"} loading={loading} />

    <div style={containerstyle}>
      <Graph data={xy}/>
      <div><div style={{fontWeight: "bold"}}>Skated</div> {age}</div>
      <div><div style={{fontWeight: "bold"}}>Distance</div> {Math.round(dist*1000)} meters</div>
      <div><div style={{fontWeight: "bold"}}>Time</div>{formattedTime}</div>
      <div><div style={{fontWeight: "bold"}}>Points</div>{doc.tracking.length}</div>
      <div><div style={{fontWeight: "bold"}}>Avg speed</div>{avgspeed}</div>
      <div><div style={{fontWeight: "bold"}}>Deck</div> {doc.deck.name}</div>
    </div>
  </div>;
};

const ViewSkate = ({ loading, doc, match }) => {
  if(loading || !doc) return null;
  console.log(loading, doc, match, loading);
  return renderSkate({doc, match, history});
};

ViewSkate.propTypes = {
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired
};

export default createContainer(({ match }) => {
  const skateId = match.params._id;
  const subscription = Meteor.subscribe('skates.view', skateId);

  return {
    loading: !subscription.ready(),
    doc: Skates.findOne(skateId),
  };
}, ViewSkate);
