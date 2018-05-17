import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AuthenticatedNavigation from './AuthenticatedNavigation';
import PublicNavigation from './PublicNavigation';
import OfflineNavigation from './OfflineNavigation';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import Loading from './Loading';


const AuthenticatedDisplay = (props) => {
  const {authenticated} = props;
  return authenticated ? <AuthenticatedNavigation {...props} />:<PublicNavigation {...props}/>
}

export const buttonStore = ReactiveVar();

class Navigation extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    loading: PropTypes.bool,
  }
  render() {
    const { match, location, history, title, authenticated, loading, connected, button } = this.props
    console.log(button);
    return (
      <div>
        <div style={{height:"50px"}}></div>
        <AppBar position="fixed">
          <Toolbar>
              {!connected ? <OfflineNavigation {...this.props} />:<AuthenticatedDisplay {...this.props}/>}
            <Typography type="title" color="inherit">
              {title}
            </Typography>
            <div style={{marginRight: "0px",
marginLeft: "auto"}}>{ button }</div>
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
  console.log(buttonStore.get());
  return {
    loggingIn,
    authenticated: !loggingIn && !!userId,
    roles: !loading && Roles.getRolesForUser(userId),
    connected: Meteor.status().connected,
    button:buttonStore.get()
  };
}, Navigation));

