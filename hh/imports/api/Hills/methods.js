import {
    Meteor
}
    from 'meteor/meteor';
import {
    check
}
    from 'meteor/check';
import Collection from './index.js';
import rateLimit from '../rate-limit';
console.log(Collection._name);
const methods = {};

Meteor.getHill = (skate) => {
    return Collection.findOne(Collection.insert({
        location: skate.start,
        created: new Date()
    }));
}

Meteor.getHill = (skate) => {
    Meteor.userId();
    const userHill = Hills.findOne({
        location: {
            $near: {
                $geometry: skate.start,
                $maxDistance: 1000
            }
        },
        user: userId
    });
    if (userHill) return userHill._id;

    const newId = Hills.insert(hill);
    Hills.find({
        location: {
            $near: {
                $geometry: skate.start,
                $maxDistance: 1000
            }
        },
        user: {
            $ne: userId
        }
    }).forEach(function (existingHill) {
        const existingSuggestion = FriendshipSuggestions.findOne({
            $or: [{
                $and: [{
                    "user.userId": existingHill.user
                }, {
                    "friend.userId": userId
                }]
            }, {
                $and: [{
                    "user.userId": existingHill.user
                }, {
                    "friend.userId": userId
                }]
            }]
        });
        if (!existingSuggestion) {
            const existingUser = Meteor.users.findOne(existingHill.user);
            const existingUserName = existingUser.profile.name;

            const suggestion = {
                "user": {
                    userId: existingHill.user,
                    name: existingUserName,
                    hill: newId
                },
                "friend": {
                    userId: userId,
                    name: userName,
                    hill: existingHill._id
                }
            };
            if (!FriendshipSuggestions.findEitherUser(existingHill.user, userId).count()) {
                FriendshipSuggestions.insert(suggestion);
            }
        }
    });
    console.log("ADD HILL", hill, "NEW ID ", newId);
    return newId;
}


methods[Collection._name + ".update"] = (doc) => {
    console.log(doc);
    try {
        check(doc, {
            name: Object
        });

        const { _id } = doc;
        doc.modified = new Date();
        Collection.update(_id, {
            $set: doc
        });
        return id; // Return _id so we can redirect to document after update.
    } catch (e) {
        console.error(e);
        throw e;
    }
}
methods[Collection._name + "remove"] = (doc) => {
    check(id, String);

    return Collection.remove(id);
};
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
