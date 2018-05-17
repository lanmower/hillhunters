import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Menu, { MenuItem } from 'material-ui/Menu';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';

class PublicNavigation extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  state = {
    anchorEl: undefined,
    open: false,
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { match, location, history } = this.props
    return (
  <div>
    <IconButton variant="raised" color="primary" style={{color:"white"}} aria-label="Menu" onClick={this.handleClick}>
      <MenuIcon />
    </IconButton>
    <Menu
      id="simple-menu"
      anchorEl={this.state.anchorEl}
      open={this.state.open}
      onClose={this.handleRequestClose}
    >
      <MenuItem onClick={()=>{history.push('/signup')}} >Sign Up</MenuItem>
      <MenuItem onClick={()=>{history.push('/login')}}>Sign in</MenuItem>
    </Menu>
  </div>
    );
  }
}

export default withRouter(PublicNavigation);
