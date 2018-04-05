import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Loading from '../../page/components/Loading';
import PagesCollection from '/imports/api/Pages/Pages';
import { createContainer } from 'meteor/react-meteor-data';
import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Navigation from '../../page/components/Navigation'; 
import Moment from 'moment';

import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
}
from 'material-ui/List';
import Button from 'material-ui/Button';


const handleRemove = (pageId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('pages.remove', pageId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Page deleted!', 'success');
      }
    });
  }
};

const Pages = ({ loading, thread, pages, match, history }) => {
console.log(loading, thread, pages);
return (
  <div className="Pages">
    <Button fab style={{margin: 0, top: 'auto', right: 20, bottom: 20, left: 'auto', position: 'fixed'}} color="primary" aria-label="add" onClick={()=>{history.push('/pages/new')}}>
        <AddIcon />
      </Button>
    {pages.length ? <List>
      {pages.map(({ _id, name, shape, createdAt, updatedAt }) => (
        <ListItem button onClick={() => history.push(`${match.url}/edit/${_id}`)} key={_id}>
          <ListItemText primary={name} secondary={Moment(createdAt).fromNow()} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleRemove(_id)} aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List> : <div>No pages yet!</div>}
  </div>
)};

Pages.propTypes = {
  loading: PropTypes.bool.isRequired,
  pages: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
    const threadId = match.params._thread;
    console.log(threadId); 
    const subscription = Meteor.subscribe('pages', threadId);
    const pages = PagesCollection.find().fetch();
    return {
      loading: !subscription.ready(),
      thread: threadId,
      pages
    };
  }, Pages);
