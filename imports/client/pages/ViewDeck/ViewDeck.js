import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Decks from '../../../api/Decks/Decks';
import NotFound from '../NotFound/NotFound';
import Loading from '../../components/Loading/Loading';
import Navigation from '../../components/Navigation/Navigation';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';

const handleRemove = (deckId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('decks.remove', deckId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Deck deleted!', 'success');
        history.push('/decks');
      }
    });
  }
};

const groupstyle = {paddingTop:"10px", paddingBottom:"10px"};
const labelstyle = {paddingTop:"0px", paddingBottom:"10px"};
const containerstyle = {paddingLeft:"40px", paddingRight:"40px", paddingBottom:"80px"};
const ViewDeck = ({ doc, match, history, loading}) => (doc ? (
    <div className="ViewDeck">
      <Navigation title={`Viewing "${doc.name}"`} loading={loading} />
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



ViewDeck.propTypes = {
  loading: PropTypes.bool.isRequired,
  doc: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const deckId = match.params._id;
  const subscription = Meteor.subscribe('decks.view', deckId);

  return {
    loading: !subscription.ready(),
    doc: Decks.findOne(deckId) || {},
  };
}, ViewDeck);
