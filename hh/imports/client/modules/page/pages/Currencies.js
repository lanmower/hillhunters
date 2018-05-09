import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Loading from '/imports/client/components/Loading';
import CurrenciesCollection from '/imports/api/Currencies/Currencies';
import { createContainer } from 'meteor/react-meteor-data';
import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Navigation from '/imports/client/components/Navigation';
import Moment from 'moment';

import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
}
from 'material-ui/List';
import Button from 'material-ui/Button';



const Currencies = ({ loading, currencies, match, history }) => (
  <div className="Currencies">
    <Navigation title="Currencies" loading={loading}/>
    {currencies.length ? <List>
      {currencies.map(({ _id, FullName, Algorithm }) => (
        <ListItem button onClick={() => history.push(`${match.url}/${_id}`)} key={_id}>
          <ListItemText primary={FullName} secondary={Algorithm} />
        </ListItem>
      ))}
    </List> : <div>No currencies yet!</div>}
  </div>
);

Currencies.propTypes = {
  loading: PropTypes.bool.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function GetCurrenciesContainer(Currencies) {
  
  return createContainer(() => {
    const subscription = Meteor.subscribe('currencies');
    return {
      loading: !subscription.ready(),
      currencies: CurrenciesCollection.find().fetch(),
    };
  }, Currencies);
}

export default GetCurrenciesContainer(Currencies);
