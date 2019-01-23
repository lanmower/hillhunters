import { withTracker } from 'meteor/react-meteor-data';
import PM from 'platemale';
const config = {
  collectionTypes: {
    client: false,
    server: true,
    submission: true
  },
  name: "track",
  defaultRoutes: {
    view:true,
    new:false,
    edit:true,
    list:true
  },
  listView: {
    primary: ({name})=>{return name?name:''},
    secondary: () => {return null},
    extra: ()=>{return null}
  },
  schema:
  [
    {
      name:'startTime',
      type: String,
      label:'Start Time',
    },
    {
      name:'start',
      type: String,
      label:'Start Location',
    },
    {
      name:'deck',
      type: Object,
      label:'Deck info',
      blackbox: true,
    },
    {
      name:'tracking',
      type: Array,
      label:'Tracking info',
    },
    {
      name:'tracking.$',
      type: Object,
      label:'Tracking info',
    },
  ]
}
const exp = PM.initCollections(PM.defaults(config));

if(Meteor.isClient) {
  const NewTrack = require('./client').default;
  exp.routes.unshift({
      path: "/"+config.name+"/new", component: PM.NavigationPage(NewTrack)
  });
}

export default exp;
