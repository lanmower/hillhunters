import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '/imports/client/components/Navigation';
import GpsFixedIcon from 'material-ui-icons/GpsFixed';
import StopIcon from 'material-ui-icons/Stop';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Moment from 'moment';
import Location from './location';
import Distance from 'gps-distance';
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
import Collection from '/imports/api/Tracks';

const collectionName = Collection._name;
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

class New extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  start() {
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
        Collection.insert({
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
          if (Distance(lng, lat, location.longitude, location.latitude) < 0.030 && Distance(lng, lat, location.longitude, location.latitude) > 0.001) {
            lng = location.longitude.toFixed(6);
            lat = location.latitude.toFixed(6);
            self.setState({
              lastLocation: location,
              points: self.state.points + 1
            });
            Collection.update({
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

  stop() {
    Location.stopWatching();
    doc = Collection.findOne(this.state.id);
    const distance = Distance(utils.trackingtoxy(track));
    console.log(distance);
    if (distance < 50) {
      Collection.remove(this.state.id);
      Bert.alert('Distance too short, deleted', 'danger');
    } else if (doc.tracking.length < 10) {
      Collection.remove(this.state.id);
      Bert.alert('Too few points, deleted', 'danger');
    } else {
      Collection.update({
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
    this.props.history.push('/'+collectionName);
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
        <div className="New">
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
          <Button variant="fab" style={{ margin: 0, top: 'auto', right: 20, bottom: 20, left: 'auto', position: 'fixed' }} color="primary" aria-label="track" onClick={() => { this.stop() }}>
            <StopIcon />
          </Button>
        </div> : <div className="New">
          <Navigation title="New Track" />

          {this.state.deck ? <Button variant="fab" style={{ margin: 0, top: 'auto', right: 20, bottom: 20, left: 'auto', position: 'fixed' }} color="primary" aria-label="track" onClick={() => { this.start() }}>
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

New.propTypes = {
  history: PropTypes.object.isRequired,
};

function GetContainer(New) {
  return createContainer(() => {
    return {
      loading: false, //!subscription.ready(),
      decks: Meteor.decks.find().fetch(),
    };
  }, New);
}

export default GetContainer(New);
