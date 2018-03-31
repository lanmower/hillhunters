/* eslint-disable consistent-return */
import { Mongo } from 'meteor/mongo';
const Pages = new Mongo.Collection('pages');
Meteor.pages = Pages

export default Pages;

Pages.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Pages.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});
