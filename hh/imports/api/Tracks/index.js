/*global Ground */
/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
Meteor.tracks = new Ground.Collection('tracks', {
    connection: null
});

export default Meteor.tracks;
