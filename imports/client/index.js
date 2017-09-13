import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import Authenticated from './components/Authenticated/Authenticated';
import Public from './components/Public/Public';
import Index from './pages/Index/Index';
import Tracks from './pages/Tracks/Tracks';
import NewTrack from './pages/NewTrack/NewTrack';
import Decks from './pages/Decks/Decks';
import NewDeck from './pages/NewDeck/NewDeck';
import ViewDeck from './pages/ViewDeck/ViewDeck';
import EditDeck from './pages/EditDeck/EditDeck';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import RecoverPassword from './pages/RecoverPassword/RecoverPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';
import Typography from 'material-ui/Typography';
import './globalstyle.js';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

const AppRouter = props => {
  console.log(props.connected);
  return (
  !props.loading ?
    <Router>
      <Switch>
        <Route exact path="/" component={Index} {...props} />
          <Authenticated exact path="/decks/:_id/edit" component={EditDeck} {...props} />
          <Authenticated exact path="/decks/new" component={NewDeck} {...props} />
          <Authenticated exact path="/tracks/new" component={NewTrack} {...props} />
          <Authenticated exact path="/decks/:_id" component={ViewDeck} {...props} />
          <Authenticated exact path="/decks" component={Decks} {...props} />
          <Authenticated exact path="/tracks" component={Tracks} {...props} />
          <Authenticated exact path="/profile" component={Profile} {...props} />
          <Public path="/signup" component={Signup} {...props} />
          <Public path="/login" component={Login} {...props} />
          <Public path="/logout" component={Logout} {...props} />
          <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
          <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />
          <Route component={NotFound} />
      </Switch>
    </Router> : <Router>
      <Switch>
          <Route exact path="/" component={Index} {...props} />
          <Route exact path="/tracks/new" component={NewTrack} {...props} />
          <Route exact path="/tracks" component={Tracks} {...props} />
          <Route component={NotFound} />
      </Switch>
    </Router>
    
)};

AppRouter.propTypes = {
  loading: PropTypes.bool.isRequired
};

const getUserName = name => ({
  string: name,
  object: `${name.first} ${name.last}`,
}[typeof name]);

const AppContainer = createContainer(() => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const loading = !Roles.subscription.ready();
  const name = user && user.profile && user.profile.name && getUserName(user.profile.name);
  const emailAddress = user && user.emails && user.emails[0].address;
  const { connected } = Meteor.status();
  return {
    loading,
    loggingIn,
    authenticated: !loggingIn && !!userId,
    name: name || emailAddress,
    roles: !loading && Roles.getRolesForUser(userId),
    connected: connected
  };
}, AppRouter);

render(<AppContainer />, document.getElementById('app'));
