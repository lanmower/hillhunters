import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import getPrivateFile from './get-private-file';
import parseMarkdown from '../../parse-markdown';

Meteor.methods({
  'utility.getPage': function utilityGetPage(fileName) {
    check(fileName, String);
    return parseMarkdown(getPrivateFile(`pages/${fileName}.md`));
  },
});
