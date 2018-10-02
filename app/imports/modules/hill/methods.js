import {
    Meteor
}
    from 'meteor/meteor';
import {
    check
}
    from 'meteor/check';
import Collection from './collection';
import rateLimit from '../rate-limit';

const methods = {};

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
    return newId;
}
