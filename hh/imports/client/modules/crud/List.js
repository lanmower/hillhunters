import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '/imports/client/components/Navigation';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

const render = ({ docs, match, history, loading, renderDoc, button, Collection }) => {
  console.log(docs);
  return (
    <div className="List">
      <Navigation title={Collection._name} loading={loading} button={button(history)} />
      {docs.length ? <List>
        {docs.map(renderDoc)}
      </List>
        : <div>
           None found.
        </div>}
    </div>
  );

}
export default render;