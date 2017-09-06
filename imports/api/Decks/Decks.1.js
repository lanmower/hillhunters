/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Decks = Meteor.decks;

Decks.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Decks.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});
 
Decks.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this deck belongs to',
    required:false,
    autoValue() {
      if (this.isInsert) return Meteor.userId();
    }
  },
  createdAt: {
    type: String,
    label: 'The creation date',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The last update date',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  name: {
    type: String,
    label: 'The title of the document',
  },
  shape: {
    type: String,
    label: 'The shape',
  },
  edge: {
    type: String,
    label: 'The edge type',
  },
  mount: {
    type: String,
    label: 'The mount type',
  },
  curve: {
    type: String,
    label: 'The curve type',
  },
  bushingHardness: {
    type: Number,
    label: 'Hardness of the bushings',
  },
  orientationleft: {
    type: String,
    label: 'Side of the bushings',
  },
  orientationright: {
    type: String,
    label: 'Side of the bushings',
  },
  griptape: {
    type: String,
    label: 'Grip tape type',
  },
  wheelhardness: {
    type: Number,
    label: 'Grip tape type',
  },
  wheelsize: {
    type: Number,
    label: 'Grip tape type',
  },
  bearings: {
    type: String,
    label: 'Grip tape type',
  },
});

Decks.attachSchema(Decks.schema);

export default Decks;
