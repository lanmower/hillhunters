import {
    Meteor
}
    from 'meteor/meteor';
import {
    check
}
    from 'meteor/check';
import Collection from './';
import rateLimit from '../rate-limit';

const methods = {};
methods[Collection._name + ".insert"] = (doc) => {
    console.log("Inserting:", doc);
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
};
methods[Collection._name + ".update"] = (doc) => {
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
};
methods[Collection._name + ".remove"] = (id) => {
    check(id, String);

    return Pages.remove(id);
}


Meteor.methods(methods);

rateLimit({
    methods: [
        Collection._name + '.insert',
        Collection._name + '.update',
        Collection._name + '.remove',
    ],
    limit: 5,
    timeRange: 1000,
});
