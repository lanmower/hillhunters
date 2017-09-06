import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Decks from '../../../api/Decks/Decks';
import DeckEditor from '../../components/DeckEditor/DeckEditor';
import NotFound from '../NotFound/NotFound';
import Navigation from '../../components/Navigation/Navigation';

const EditDeck = ({ doc, history }) => (doc ? (
  <div className="EditDeck">
    <Navigation title={`Editing "${doc.name}"`} loading={loading} />
    <DeckEditor doc={doc} history={history} />
  </div>
) : <NotFound />);

EditDeck.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const documentId = match.params._id;
  //const subscription = Meteor.subscribe('decks.view', documentId);
  return {
    loading: false,//!subscription.ready(),
    doc: Decks.findOne(documentId),
  };
}, EditDeck);
