import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Tracks from '../../../api/Tracks/Tracks';
import NotFound from '../NotFound/NotFound';
import Loading from '../../components/Loading/Loading';
import Navigation from '../../components/Navigation/Navigation';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';

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
  return (doc ? (
  <div className="ViewTrack">
    <Navigation title={doc.name?`Viewing "${doc.name}"`:"View deck"} loading={loading} />
    <div style={containerstyle}>
      <div className="page-header clearfix">
        <Button fab style={{margin: 0, top: 'auto', right: 20, bottom: 20, left: 'auto', position: 'fixed'}} color="primary" aria-label="add" onClick={() => history.push(`${match.url}/edit`)}>
          <EditIcon />
        </Button>
        <IconButton className="raised" onClick={() => handleRemove(doc._id, history)} aria-label="Delete" style={{float:"right"}}>
          <DeleteIcon />
        </IconButton>
      </div>
      <div style={groupstyle}><div style={labelstyle}>Shape</div><img style={{height:"2em"}} src={"/images/shapes/"+doc.shape+".png"} alt={doc.shape}/></div>
      <div style={groupstyle}><div style={labelstyle}>Edge</div><img style={{height:"2em"}} src={"/images/edges/"+doc.edge+".png"} alt={doc.edge}/></div>
      <div style={groupstyle}><div style={labelstyle}>Mount</div><img style={{height:"2em"}} src={"/images/mount/"+doc.mount+".png"} alt={doc.mount}/></div>
      <div style={groupstyle}><div style={labelstyle}>Curve</div><img style={{height:"2em"}} src={"/images/curves/"+doc.curve+".png"} alt={doc.curve}/></div>
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
  const subscription = Meteor.subscribe('tracks.view', trackId);

  return {
    loading: !subscription.ready(),
    doc: Tracks.findOne(trackId) || {},
  };
}, ViewTrack);
