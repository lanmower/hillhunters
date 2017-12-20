import { Meteor } from 'meteor/meteor';

if (Meteor.isDevelopment && Meteor.settings.private) process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;
