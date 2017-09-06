import React from 'react';
import PropTypes from 'prop-types';
import DeckEditor from '../../components/DeckEditor/DeckEditor';
import Navigation from '../../components/Navigation/Navigation';
import Location from '../../location';

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
