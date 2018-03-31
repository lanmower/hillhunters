/*import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Skates from '../skates/Skates.js';

Meteor.publish('posts', function posts(threadId) {
  console.log(this.userId, threadId, Posts.find({ owner: this.userId, threadId }).fetch());
  return Posts.find({ owner: this.userId, threadId });
});

// Note: documents.view is also used when editing an existing document.
Meteor.publish('posts.view', function postsView(postId) {
  check(postId, String);
  return Posts.find({ _id: postId, owner: this.userId });
});
*/