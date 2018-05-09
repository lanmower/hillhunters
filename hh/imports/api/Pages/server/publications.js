import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Collection from '../';

Meteor.publish(Collection._name, (name) => {
  return Collection.find({ name });
});

// Note: documents.view is also used when editing an existing document.
Meteor.publish(Collection._name+'.view', function postsView(_id) {
  check(_id, String);
  return Collection.find({ _id, owner: this.userId });
});
