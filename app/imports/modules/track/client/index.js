import React from 'react';
import PropTypes from 'prop-types';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import StopIcon from '@material-ui/icons/Stop';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createContainer } from 'meteor/react-meteor-data';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import Moment from 'moment';
import Location from './location';
import Distance from 'gps-distance';
import utils from '/imports/modules/utils.js';
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
    /*buttonStore.set(<Button id="test2" aria-label="track" onClick={() => { this.startTracking() }}>
      <GpsFixedIcon />
    </Button>);*/
    const {navButtonStore} = props;
    navButtonStore.set(<IconButton className="raised" color="primary" style={{color:"white"}} onClick={ this.startTracking.bind(this) }><GpsFixedIcon /></IconButton>);

    this.state = defaultState;
  }

  gotLocation (location) {
    const { lastLocation } = this.state;
    const collection = Meteor.modules.track.submissionsCollection;
    if (!this.state.id && !this.state.inserting) {
      this.setState({
        inserting: true,
        firstLocation: posToPoint(location)
      });
      const _id = collection.insert({
        startTime: new Date(),
        start: posToPoint(location),
        deck: collection.findOne(this.state.deck),
        tracking: []
      });
      if (_id) {
        this.setState({
          id: _id,
          start: new Date(),
          tracking: true,
          inserting: false
        });
        console.log(this.state);

        this.interval =
          setInterval(() => {
            const age = Moment(new Date()).diff(this.state.start);
            const ms = Moment.duration(age).as('milliseconds');
            const time = Moment.utc(ms).format("HH:mm:ss.SSS");

            this.setState({
              time: time
            });
          }, 40);
      }

    } else {
      if (this.state.id) {
        const lastLat = lastLocation ? lastLocation.latitude : 0;//.toFixed(6);
        const lastLng = lastLocation ? lastLocation.longitude : 0;//.toFixed(6);
        const currentLng = location.longitude;//.toFixed(6);
        const currentLat = location.latitude;//.toFixed(6);
        const lastTime = lastLocation ? lastLocation.timestamp : 0;
        const lastSpeed = lastLocation ? lastLocation.speed : 0;
        const distCoords = [{coords:{ latitude: lastLat, longitude: lastLng, time: lastTime }}, {coords:{ latitude: currentLat, longitude: currentLng, time: location.timestamp }}];
        console.log(distCoords);
        const km = location.meters = utils.getDistance(distCoords);
        const meters = location.meters = km * 1000;
        const time = location.time = location.timestamp - lastTime;
        const hour = location.hour = (((time / 1000) / 60) / 60) / 60;
        const speed = location.speed = km / hour;
        const acceleration = location.acceleration = (speed - lastSpeed) / (time / 1000);
        console.log(distCoords, meters, speed);
        if ((meters > 1 && speed < 100) || this.state.points == 0) {
          this.setState({lastLocation : location});
          console.log('set location', location);
          this.setState({
            lastLocation: location,
            points: this.state.points + 1
          });
          collection.update({
            _id: this.state.id
          }, {
              $push: {
                tracking: location
              }
            });
        }
      }

    }
  }

  startTracking() {
    const {navButtonStore} = this.props;
    this.setState({
      tracking: true
    });
    navButtonStore.set(<IconButton className="raised" color="primary" style={{color:"white"}} onClick={this.stopTracking.bind(this)}><StopIcon /></IconButton>);
    /*
    buttonStore.set(<Button id="test1" aria-label="track" onClick={() => { this.stopTracking() }}>
      <StopIcon />
    </Button>);*/
    Location.startWatching(this.gotLocation.bind(this));
  }

  stopTracking() {
    Location.stopWatching();
    const collection = Meteor.modules.track.submissionsCollection;
    const track = collection.findOne(this.state.id);
    const distance = 55;//utils.getDistance(utils.trackingtoxy(track));
    if (distance < 50) {
      collection.remove(this.state.id);
      Bert.alert('Distance too short, Track deleted', 'danger');
    } else if (track.tracking.length < 10) {
      collection.remove(this.state.id);
      Bert.alert('Too few points, Track deleted', 'danger');
    } else {
      collection.update({
        _id: this.state.id
      }, {
          $set: {
            stop: this.state.lastLocation,
            //distance: distance
          }
        });

    }
    this.setState(defaultState);
    clearInterval(this.interval);
    this.props.history.push('/track');
  }

  render() {
    const {
      history,
      match,
    } = this.props;
    const {
      time,
      lastLocation,
      points
    } = this.state;
    const decks = Meteor.modules.deck.clientCollection.find().fetch();

    return (
      this.state.tracking ?
        <div className="NewTrack">
          tracking
          <h1>{time}</h1>
          <h3>{points} Points captured</h3>
          {lastLocation ? (<h4>Latitude:{lastLocation.latitude} Longitude:{lastLocation.longitude}</h4>) : ""}

        </div> : <div className="NewTrack">
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

export default NewTrack;
