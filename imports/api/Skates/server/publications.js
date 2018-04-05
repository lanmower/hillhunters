import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Skates from '../Skates';

Meteor.publish('skates', function skates() {
  return Skates.find({ owner: this.userId });
});

// Note: documents.view is also used when editing an existing document.
Meteor.publish('skates.view', function skatesView(skateId) {
  check(skateId, String);
  return Skates.find({ _id: skateId, owner: this.userId });
});
