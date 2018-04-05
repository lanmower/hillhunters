import {
    Meteor
}
from 'meteor/meteor';
import {
    check
}
from 'meteor/check';
import Skates from './Skates';
import rateLimit from '../rate-limit';

Meteor.methods({
    'skates.insert': (doc) => {
        console.log("Inserting:",doc);
        try {
            check(doc, {
                deck: {
                    name: String,
                    shape: String,
                    edge: String,
                    mount: String,
                    curve: String,
                    orientationleft: String,
                    orientationright: String,
                    griptape: String,
                    wheelhardness: Number,
                    bushinghardness: Number,
                    wheelsize: Number,
                    bearings: String
                },
                startTime: Date,
                start: Object,
                tracking: Array
            });
            console.log(this.userId, Meteor.userId());
            const id = Skates.insert({
                owner: Meteor.userId(),
                ...doc
            });
            console.log(Skates.find().fetch());
            return id;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    'skates.update': function skatesUpdate(doc) {
        console.log(doc);
        try {
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
                bushinghardness: Number,
                wheelsize: Number,
                bearings: String
            });

            const id = doc._id;
            Skates.update(id, {
                $set: doc
            });
            return id; // Return _id so we can redirect to document after update.
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    'skates.remove': function tracksRemove(id) {
        check(id, String);

        return Skates.remove(id);
    },
});

rateLimit({
    methods: [
        'skates.insert',
        'skates.update',
        'skates.remove',
    ],
    limit: 5,
    timeRange: 1000,
});
