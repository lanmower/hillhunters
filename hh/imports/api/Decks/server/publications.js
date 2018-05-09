import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Collection from '../';

Meteor.publish(Collection._name, function decks() {
  return Collection.find({ owner: this.userId });
});

// Note: documents.view is also used when editing an existing document.
Meteor.publish(Collection._name+'.view', function decksView(deckId) {
  check(deckId, String);
  return Collection.find({ _id: deckId, owner: this.userId });
});
