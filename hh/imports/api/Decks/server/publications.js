import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Decks from '../Decks';

Meteor.publish('decks', function decks() {
  return Decks.find({ owner: this.userId });
});

// Note: documents.view is also used when editing an existing document.
Meteor.publish('decks.view', function decksView(deckId) {
  check(deckId, String);
  return Decks.find({ _id: deckId, owner: this.userId });
});
