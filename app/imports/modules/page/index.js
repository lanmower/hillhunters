import initCollections from '../crud/collection.js';
import config from './config.js';

if(Meteor.isClient) {
  const {defaultRoutes} = require('../crud/client/crudRoutes.js');
  export const {serverCollection, clientCollection, submissionsCollection} = initCollections(config);
  export default defaultRoutes({clientCollection, serverCollection, submissionsCollection, config});
}
if(Meteor.isServer) {
  const initPublications = require('../crud/server/publications.js');
  export const initData = initCollections(config);
  const {serverCollection} = initData;
  console.log(initPublications);
  export const publications = initPublications.default(serverCollection, config);
}
