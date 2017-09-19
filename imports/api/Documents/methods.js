import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Documents from './Documents';
import rateLimit from '../../modules/rate-limit';

function call(currencies) {    
    const currency = currencies.pop();
    if(!currency) return;
    if(!currency.social) {
        client.request({
        url: 'https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=' + currency.Id
    }).then(Meteor.bindEnvironment(function (response) {
        const data = response.getJSON().Data
        Currencies.update(currency._id, { $set: { social: data } });
        console.log(response.getStatusCode(), currency._id);
        call(currencies);
    }));
    } else {
        call(currencies);
    }    
}


Meteor.methods({
  'documents.insert': function documentsInsert(doc) {
    check(doc, {
      title: String,
      body: String,
    });

    try {
      return Documents.insert({ owner: this.userId, ...doc });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'documents.update': function documentsUpdate(doc) {
    check(doc, {
      _id: String,
      title: String,
      body: String,
    });

    try {
      const documentId = doc._id;
      Documents.update(documentId, { $set: doc });
      return documentId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'documents.remove': function documentsRemove(documentId) {
    check(documentId, String);

    try {
      return Documents.remove(documentId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'documents.insert',
    'documents.update',
    'documents.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
