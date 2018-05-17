import React from 'react';
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
}
  from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
const handleRemove = (_id, Collection) => {
  if (confirm('Are you sure? This is permanent!')) {
    Collection.remove(_id, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      else {
        Bert.alert('Deleted!', 'success');
      }
    });
  }
};
const render = ({ match, history, info, Collection, _id }) => {
  const {primary, secondary, extra} = info;
    return (
      <ListItem button onClick={() => history.push(`${match.url}/${_id}`)} key={_id}>
        {extra}
        <ListItemText primary={primary} secondary={secondary} />
        <ListItemSecondaryAction>
          <IconButton onClick={() => handleRemove(_id, Collection)} aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
  export default render;
