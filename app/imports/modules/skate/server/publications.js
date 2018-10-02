import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Collection from '../collection';
Meteor.publish(Collection._name, function hills() {
  return Collection.find({ owner: this.userId });
});

// Note: documents.view is also used when editing an existing document.
Meteor.publish(Collection._name+'.view', function hillsView(_id) {
  check(hillId, String);
  return Collection.find({ _id, owner: this.userId });
});
