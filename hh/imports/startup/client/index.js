import { Ground } from 'meteor/ground:db';
import "react-input-range/lib/css/index.css";

import Decks from "/imports/api/Decks/Decks.js";
import "/imports/api/Skates/methods.js";
import "/imports/client/";

Meteor.decks = new Ground.Collection('local.decks', {
    connection: null
});

Meteor.subscribe('decks', function() {
    Tracker.autorun(() => {
        const decks = Decks.find().fetch();
        Meteor.decks.clear();
        for(const deck in decks) {
            Meteor.decks.insert(decks[deck]);
        }
    });
});

Meteor.decks.once('loaded', () => {
});


