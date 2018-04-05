import React from 'react';
import PropTypes from 'prop-types';
import DeckEditor from '../components/DeckEditor';
import Navigation from '../../page/components/Navigation';

const NewDeck = ({ history }) => (
  <div className="NewDeck">
    <Navigation title="New Deck"/>
    <DeckEditor history={history} />
  </div>
);

NewDeck.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewDeck;
