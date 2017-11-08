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
                bushingHardness: Number,
                wheelsize: Number,
                bearings: String
            },
            startTime: Date,
            start: Object,
            tracking: Array
            
        });
        const id = Skates.insert({
            owner: this.userId,
            ...doc
        });
        console.log(Skates.find().fetch());
        return id;
    },
    'skates.update': function skatesUpdate(doc) {
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

        const id = doc._id;
        Skates.update(id, {
            $set: doc
        });
        return id; // Return _id so we can redirect to document after update.
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
