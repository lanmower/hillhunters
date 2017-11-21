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
import SkatesCollection from '/imports/api/Skates/Skates';
import { withStyles } from 'material-ui/styles';
import { red } from 'material-ui/colors';
const styles = theme => ({
  container: {
    background: red[500],
  },
});

const handleRemove = (skateId) => {
  if (confirm('Are you sure? This is permanent!')) {
    SkatesCollection.remove(skateId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      else {
        Bert.alert('Skate deleted!', 'success');
      }
    });
  }
};


class Skate extends React.Component {
  render() {
    const { match, history, deck, distance, stop, startTime, _id } = this.props;
    const age = Moment(startTime).fromNow();
    return (
      <ListItem button onClick={() => history.push(`${match.url}/${_id}`)} key={_id}>
        <ListItemText primary={"Deck:" + deck.name + " distance: " + distance?distance:0+"m"} secondary={age} />
        <ListItemSecondaryAction>
          <IconButton onClick={() => handleRemove(_id)} aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

class Skates extends React.Component {

  handleUpload() {
    const {
      history,
      skates
    } = this.props;
    for (const index in skates) {
      const doc = skates[index];
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
        skateing:doc.skateing
        
      }
      console.log(insert);
      Meteor.call('skates.insert', insert, (error, deckId) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        }
        else {
          const confirmation = 'Skates uploaded!';
          Bert.alert(confirmation, 'success');
          Meteor.skates.remove(doc._id);
        }
      });
    }
  }

  render() {
    const {
      skates,
      match,
      history,
      loading,
      connected
    } = this.props;
    console.log(this.props);
    const {containerstyle} = Meteor;
    return (
      <div className="Skates">
    <Navigation title="Skates" loading={loading} button={((skates.length && connected)?<IconButton onClick={(e) => this.handleUpload(e)} style={{marginRight: "0px", marginLeft: "auto" }} aria-label="Upload"><UploadIcon /></IconButton>:false)} />
    <Button fab style={{margin: 0, top: 'auto', right: 20, bottom: 20, left: 'auto', position: 'fixed'}} color="primary" aria-label="add" onClick={()=>{history.push('/skates/new')}}>
      <AddIcon />
    </Button>
        {skates.length ? <List style={containerstyle}>
          {skates.map(({ _id, startTime, deck, distance, stop}) => {
          const age = Moment(startTime).fromNow();

          return (
            <Skate key={_id} _id={_id} match={match} history={history} startTime={startTime} deck={deck} distance={distance} stop={stop} />
          )}
        )}
    </List>    
    : <div style={containerstyle}>
        <Typography type="headline" component="h3">
          All skates are up to date.
        </Typography>
        <Typography type="body1" component="p">
          Capture some more skates to upload.
        </Typography>
      </div>}
  </div>
    );

  }
};

Skates.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function GetSkatesContainer(Skates) {
  const subscription = Meteor.subscribe('skates');
  return createContainer(() => {
    return {
      loading: !subscription.ready(),
      documents: SkatesCollection.find().fetch(),
    };
  }, Skates);
}

export default withStyles(styles)(GetSkatesContainer(Skates));
