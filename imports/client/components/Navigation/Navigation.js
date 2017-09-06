import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AuthenticatedNavigation from '../AuthenticatedNavigation/AuthenticatedNavigation.js';
import PublicNavigation from '../PublicNavigation/PublicNavigation.js';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import Loading from '../Loading/Loading.js';
class Navigation extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    loading: PropTypes.bool
  }
  render() {
    const { match, location, history, title, authenticated, loading, button } = this.props

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
              {authenticated ? <AuthenticatedNavigation {...this.props} />:<PublicNavigation />}
            <Typography type="title" color="inherit">
              {title}
            </Typography>
            { button }
            {loading?<Loading/>:false}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withRouter(createContainer(() => {
  const loggingIn = Meteor.loggingIn();
  const userId = Meteor.userId();
  const loading = !Roles.subscription.ready();
  return {
    loggingIn,
    authenticated: !loggingIn && !!userId,
    roles: !loading && Roles.getRolesForUser(userId)
  };
}, Navigation));

