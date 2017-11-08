import React from 'react';
import PropTypes from 'prop-types';
import {
  Meteor
}
from 'meteor/meteor';
import {
  Bert
}
from 'meteor/themeteorchef:bert';
import {
  createContainer
}
from 'meteor/react-meteor-data';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import Navigation from '../../page/components/Navigation';
import Typography from 'material-ui/Typography';
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
}
from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import UploadIcon from 'material-ui-icons/Backup';
import Moment from 'moment';
import TracksCollection from '/imports/api/Tracks/Tracks';

const handleRemove = (trackId) => {
  if (confirm('Are you sure? This is permanent!')) {
    TracksCollection.remove(trackId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      else {
        Bert.alert('Track deleted!', 'success');
      }
    });
  }
};

class Tracks extends React.Component {

  handleUpload() {
    const {
      history,
      tracks
    } = this.props;
    for (const index in tracks) {
      const doc = tracks[index];
      const insert = {
        start:doc.start,
        startTime:doc.startTime,
        deck: {
          name: doc.deck.name,
          shape: doc.deck.shape,
          edge: doc.deck.edge,
          mount: doc.deck.mount,
          curve: doc.deck.curve,
          bushinghardness: doc.deck.bushinghardness,
          orientationleft: doc.deck.orientationleft,
          orientationright: doc.deck.orientationright,
          griptape: doc.deck.griptape,
          wheelhardness: doc.deck.wheelhardness,
          wheelsize: doc.deck.wheelsize,
          bearings: doc.deck.bearings
        },
        tracking:doc.tracking
        
      }
      console.log(insert);
      Meteor.call('skates.insert', insert, (error, deckId) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        }
        else {
          const confirmation = 'Tracks uploaded!';
          Bert.alert(confirmation, 'success');
          Meteor.tracks.remove(doc._id);
        }
      });
    }
  }

  render() {
    const {
      tracks,
      match,
      history,
      loading,
      connected
    } = this.props;
    console.log(this.props);
    const {containerstyle} = Meteor;
    return (
      <div className="Tracks">
    <Navigation title="Tracks" loading={loading} button={((tracks.length && connected)?<IconButton onClick={(e) => this.handleUpload(e)} style={{marginRight: "0px", marginLeft: "auto" }} aria-label="Upload"><UploadIcon /></IconButton>:false)} />
    <Button fab style={{margin: 0, top: 'auto', right: 20, bottom: 20, left: 'auto', position: 'fixed'}} color="primary" aria-label="add" onClick={()=>{history.push('/tracks/new')}}>
      <AddIcon />
    </Button>
        {tracks.length ? <List style={containerstyle}>
          {tracks.map(({ _id, startTime, deck}) => {
          const age = Moment(startTime).fromNow();

          return (
          <ListItem button onClick={() => history.push(`${match.url}/${_id}`)} key={_id}>
            <ListItemText primary={"Start: Deck:"+deck.name} secondary={age} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => handleRemove(_id)} aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
          </ListItem>
          )}
        )}
    </List>    
    : <div style={containerstyle}>
        <Typography type="headline" component="h3">
          All tracks are up to date.
        </Typography>
        <Typography type="body1" component="p">
          Capture some more tracks to upload.
        </Typography>
      </div>}
  </div>
    );

  }
};

Tracks.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function GetTracksContainer(Tracks) {
  return createContainer(() => {
    return {
      tracks: TracksCollection.find().fetch(),
      connected: Meteor.status().connected
    };
  }, Tracks);
}

export default GetTracksContainer(Tracks);
