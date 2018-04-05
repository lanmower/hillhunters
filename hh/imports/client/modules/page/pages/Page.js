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
import EditIcon from 'material-ui-icons/Edit';
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
import PageCollection from '/imports/api/Pages/Pages';
import { withStyles } from 'material-ui/styles';
import { red } from 'material-ui/colors';
const styles = theme => ({
  container: {
    background: red[500],
  },
});
import ReactMarkdown from 'react-markdown';



class Page extends React.Component {

  render() {
    const {
      page,
      match,
      history,
      loading,
      connected
    } = this.props;
    console.log(this.props);
    const { containerstyle } = Meteor;
    return (
      <div className="page">
        {page.nonav ? <Navigation title="Page" loading={loading} />:''}
        {page.length ? <div style={containerstyle}>
          {page.map(({ _id, body }) => {
            return (
              <ReactMarkdown key={_id} source={body} />
            )
          }
          )}
        </div>
          : <div style={containerstyle}>
            Loading...
          </div>}
      </div>
    );

  }
};

Page.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function GetPageContainer(page) {
  return createContainer(({match}) => {
  const {name} = match.params;
  const subscription = Meteor.subscribe('pages', name);
    return {
      loading: !subscription.ready(),
      page: PageCollection.find({name}).fetch(),
      connected: Meteor.status().connected
    };
  }, page);
}

export default withStyles(styles)(GetPageContainer(Page));
