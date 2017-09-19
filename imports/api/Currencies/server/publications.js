import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Currencies from '../Currencies';

Meteor.publish('currencies', function currencies() {
  return Currencies.find({}, {sort: {SortOrder: 1}});
});

