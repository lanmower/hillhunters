/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Currencies = new Mongo.Collection('currencies');
Meteor.currencies = Currencies;
Currencies.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Currencies.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});


export default Currencies;
