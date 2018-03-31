import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Pages from '../Pages';
Meteor.publish('pages', (name) => {
  console.log('subscribed',Pages.find({ name }).fetch());
  return Pages.find({ name });
});

// Note: documents.view is also used when editing an existing document.
Meteor.publish('pages.view', function postsView(_id) {
  check(_id, String);
  console.log('page view subscribe');
  return Pages.find({ _id, owner: this.userId });
});
