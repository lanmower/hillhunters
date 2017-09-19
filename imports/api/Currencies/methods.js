import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Currencies from './Currencies';
import client from 'http-api-client';


Meteor.methods({
    'updateCurrencies': function () {
        client.request({
            url: 'https://www.cryptocompare.com/api/data/coinlist/'
        }).then(Meteor.bindEnvironment(function (response) {
            console.log(response.getStatusCode());
            //response.getData();
            const data = response.getJSON().Data
            for (x in data) {
                const currency = data[x];
                console.log(currency);

                //Currencies.insert({...currency});
            }


            console.log(currency); // returns a JSON-parsed repsonse 
        }));
    },
    'updatesocials': function () {
        const currencies = Currencies.find().fetch();
        call(currencies);

    }

})

