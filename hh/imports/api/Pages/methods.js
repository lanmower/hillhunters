import {
    Meteor
}
from 'meteor/meteor';
import {
    check
}
from 'meteor/check';
import Pages from './Pages';
import rateLimit from '../rate-limit';

Meteor.methods({
    'pages.insert': (doc) => {
        console.log("Inserting:",doc);
        try {
            check(doc, {
                _id: String,
                name: String,
                body: String
            });
            const id = Pages.insert({
                owner: this.userId,
                ...doc
            });
            console.log(Pages.find().fetch());
            return id;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    'pages.update': function pagesUpdate(doc) {
        console.log(doc);
        try {
            check(doc, {
                _id: String,
                body: String
            });

            const id = doc._id;
            Pages.update(id, {
                $set: doc
            });
            return id; // Return _id so we can redirect to document after update.
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    'pages.remove': function tracksRemove(id) {
        check(id, String);

        return Pages.remove(id);
    },
});

rateLimit({
    methods: [
        'pages.insert',
        'pages.update',
        'pages.remove',
    ],
    limit: 5,
    timeRange: 1000,
});
