/* eslint-disable consistent-return */
import { Mongo } from 'meteor/mongo';
const Skates = new Mongo.Collection('skates');

export default Skates;

Skates.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Skates.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});
