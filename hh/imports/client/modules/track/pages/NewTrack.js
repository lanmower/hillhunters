import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../../page/components/Navigation';
import GpsFixedIcon from 'material-ui-icons/GpsFixed';
import StopIcon from 'material-ui-icons/Stop';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Moment from 'moment';
import Location from '../location';
import TracksCollection from '/imports/api/Tracks/Tracks';
import DecksCollection from '/imports/api/Decks/Decks';
import Distance from 'gps-distance';
<<<<<<< HEAD:imports/client/modules/track/pages/NewTrack.js

=======
>>>>>>> 16d8289678201a58cf96669a4eabde82c7718c83:hh/imports/client/modules/track/pages/NewTrack.js
import {
  createContainer
}
  from 'meteor/react-meteor-data';
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
}
  from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import utils from '/imports/utils.js';

const posToPoint = function (pos) {
  const point = {
    "type": "Point",
    "coordinates": [
      pos.longitude,
      pos.latitude
    ]
  };
  return point;
}

const defaultState = {
  tracking: false,
  lastLocation: false,
  firstLocation: false,
  start: new Date(),
  time: false,
  points: 0,
  id: false,
  deck: false,
  inserting: false
};

class NewTrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  startTracking() {
    const self = this;
    self.setState({
      tracking: true
    });

    Location.startWatching(function (location) {
      var lng = 0,
        lat = 0;
      if (!self.state.id && !self.state.inserting) {
        self.setState({
          inserting: true,
          firstLocation: posToPoint(location)
        });
        TracksCollection.insert({
          startTime: new Date(),
          start: posToPoint(location),
          deck: Meteor.decks.findOne(self.state.deck),
        }, function (error, _id) {
          if (_id) {
            self.setState({
              id: _id,
              start: new Date(),
              tracking: true,
              inserting: false
            });
            self.interval =
              setInterval(() => {
                const age = Moment(new Date()).diff(self.state.start);
                const ms = Moment.duration(age).as('milliseconds');
                const time = Moment.utc(ms).format("HH:mm:ss.SSS");

                self.setState({
                  time: time
                });
              }, 40);
          }
          else {
            console.log(error);
          }
        });
      }
      else {
        if (self.state.id) {
          if (lng != location.longitude.toFixed(6) || lat != location.latitude.toFixed(6)) {

            lng = location.longitude.toFixed(6);
            lat = location.latitude.toFixed(6);
            self.setState({
              lastLocation: location,
              points: self.state.points + 1
            });
            TracksCollection.update({
              _id: self.state.id
            }, {
                $push: {
                  tracking: location
                }
              });
          }
        }

      }
    });
  }

  stopTracking() {
    Location.stopWatching();
    track = TracksCollection.findOne(this.state.id);
    const distance = Distance(utils.trackingtoxy(track));
    console.log(distance);
    if (distance < 50) {
      TracksCollection.remove(this.state.id);
      Bert.alert('Distance too short, Track deleted', 'danger');
    } else if (track.tracking.length < 10) {
      TracksCollection.remove(this.state.id);
      Bert.alert('Too few points, Track deleted', 'danger');
    } else {
      TracksCollection.update({
        _id: this.state.id
      }, {
          $set: {
            stop: this.state.lastLocation,
            distance: distance
          }
        });

    }
    this.setState(defaultState);
    clearInterval(this.interval);
    this.props.history.push('/tracks');
  }

  render() {
    const {
      history,
      match,
      decks
    } = this.props;
    const {
      time,
      lastLocation,
      points
    } = this.state;
    return (
      this.state.tracking ?
        <div className="NewTrack">
          <AppBar position="static">
            <Toolbar>
              <Typography type="title" color="inherit">
                Tracking
            </Typography>
            </Toolbar>
          </AppBar>
          <h1>{time}</h1>
          <h3>{points} Points captured</h3>
          {lastLocation ? (<h4>Latitude:{lastLocation.latitude} Longitude:{lastLocation.longitude}</h4>) : ""}
          <Button fab style={{ margin: 0, top: 'auto', right: 20, bottom: 20, left: 'auto', position: 'fixed' }} color="primary" aria-label="track" onClick={() => { this.stopTracking() }}>
            <StopIcon />
          </Button>
        </div> : <div className="NewTrack">
          <Navigation title="New Track" />

          {this.state.deck ? <Button fab style={{ margin: 0, top: 'auto', right: 20, bottom: 20, left: 'auto', position: 'fixed' }} color="primary" aria-label="track" onClick={() => { this.startTracking() }}>
            <GpsFixedIcon />
          </Button> : null}
          {decks.length ? <List>
            {decks.map(({ _id, name, shape, createdAt, updatedAt }) => (
              <ListItem button onClick={() => { this.setState({ deck: _id }) }} key={_id}>
                <Checkbox
                  checked={this.state.deck == _id}
                  tabIndex="-1"
                  disableRipple
                />
                <ListItemText primary={name} secondary={Moment(createdAt).fromNow()} />
                <img style={{ height: "2em" }} src={"/images/shapes/" + shape + ".png"} alt={shape} />
              </ListItem>

            ))}
          </List> : <div>No decks yet!</div>}

        </div>
    )

  }
}

NewTrack.propTypes = {
  history: PropTypes.object.isRequired,
};

function GetNewTrackContainer(NewTrack) {
  return createContainer(() => {
    return {
      loading: false, //!subscription.ready(),
      decks: Meteor.decks.find().fetch(),
    };
  }, NewTrack);
}

export default GetNewTrackContainer(NewTrack);
