import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Decks from './Decks';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'decks.insert': (doc)=>{
    console.log(doc);
    check(doc, {
      name: String,
      shape: String,
      edge: String,
      mount: String,
      curve: String,
      orientationleft: String,
      orientationright: String,
      griptape: String,
      wheelhardness: Number,
      bushingHardness: Number,
      wheelsize: Number,
      bearings: String
    });
    const deck = Decks.insert({ owner: this.userId, ...doc });
    return deck;
  },
  'decks.update': function decksUpdate(doc) {
      console.log(doc);
      check(doc, {
        _id: String,
      name: String,
      shape: String,
      edge: String,
      mount: String,
      curve: String,
      orientationleft: String,
      orientationright: String,
      griptape: String,
      wheelhardness: Number,
      bushingHardness: Number,
      wheelsize: Number,
      bearings: String
      });

      const documentId = doc._id;
      Decks.update(documentId, { $set: doc });
      return documentId; // Return _id so we can redirect to document after update.
  },
  'decks.remove': function decksRemove(documentId) {
    check(documentId, String);

    return Decks.remove(documentId);
  },
});

rateLimit({
  methods: [
    'decks.insert',
    'decks.update',
    'decks.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
