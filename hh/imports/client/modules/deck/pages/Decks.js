import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Loading from '../../page/components/Loading';
import DecksCollection from '/imports/api/Decks/Decks';
import { createContainer } from 'meteor/react-meteor-data';
import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Navigation from '../../page/components/Navigation'; 
import Moment from 'moment';

import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
}
from 'material-ui/List';
import Button from 'material-ui/Button';


const handleRemove = (deckId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('decks.remove', deckId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Deck deleted!', 'success');
      }
    });
  }
};

const Decks = ({ loading, decks, match, history }) => (
  <div className="Decks">
    <Navigation title="Decks" loading={loading}/>
    <Button fab style={{margin: 0, top: 'auto', right: 20, bottom: 20, left: 'auto', position: 'fixed'}} color="primary" aria-label="add" onClick={()=>{history.push('/decks/new')}}>
        <AddIcon />
      </Button>
    {decks.length ? <List>
      {decks.map(({ _id, name, shape, createdAt, updatedAt }) => (
        <ListItem button onClick={() => history.push(`${match.url}/${_id}`)} key={_id}>
          <ListItemText primary={name} secondary={Moment(createdAt).fromNow()} />
            <ListItemSecondaryAction>
              <img style={{height:"2em"}} src={"/images/shapes/"+shape+".png"} alt={shape}/>
              <IconButton onClick={() => handleRemove(_id)} aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List> : <div>No decks yet!</div>}
  </div>
);

Decks.propTypes = {
  loading: PropTypes.bool.isRequired,
  decks: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function GetDecksContainer(Decks) {
  
  return createContainer(() => {
    const subscription = Meteor.subscribe('decks');
    return {
      loading: !subscription.ready(),
      decks: DecksCollection.find().fetch(),
    };
  }, Decks);
}

export default GetDecksContainer(Decks);
