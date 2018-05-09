/* eslint-disable consistent-return */
import { Mongo } from 'meteor/mongo';
const Collection = new Mongo.Collection('hills');
global.FriendshipSuggestions = new Mongo.Collection('freindshipsuggestions');
Meteor[Collection._name] = Collection;

export default Collection;

Collection.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Collection.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});
