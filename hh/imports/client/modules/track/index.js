import React from 'react';
import Collection from '/imports/api/Tracks';
import ListDoc from '../crud/ListDoc';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import IconButton from 'material-ui/IconButton';
import Moment from 'moment';
import Distance from 'gps-distance';
import Graph from '/imports/client/components/Graph';
import utils from '/imports/utils.js';
import {listRoute, viewRoute, newRoute} from '../crud/crudRoutes.js';
import NewTrack from './NewTrack';
import New from '../crud/New';
import {buttonStore} from '/imports/client/components/Navigation';
import UploadIcon from 'material-ui-icons/Backup';

Collection._name = "tracks";

 const handleUpload = () => {
    const tracks = Meteor.tracks.find();
    for (const index in tracks) {
      const doc = tracks[index];
      const insert = {
        start:doc.start,
        startTime:doc.startTime,
        deck: {
          name: doc.deck.name,
          shape: doc.deck.shape,
          edge: doc.deck.edge,
          mount: doc.deck.mount,
          curve: doc.deck.curve,
          bushinghardness: doc.deck.bushinghardness,
          orientationleft: doc.deck.orientationleft,
          orientationright: doc.deck.orientationright,
          griptape: doc.deck.griptape,
          wheelhardness: doc.deck.wheelhardness,
          wheelsize: doc.deck.wheelsize,
          bearings: doc.deck.bearings
        },
        tracking:doc.tracking
        
      }
      console.log(insert);
      Meteor.call('skates.insert', insert, (error, deckId) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        }
        else {
          const confirmation = 'Tracks uploaded!';
          Bert.alert(confirmation, 'success');
          Meteor.tracks.remove(doc._id);
        }
      });
    }
  }

const renderDoc = ({ match, history, deck, distance, stop, startTime, _id }) => {
    const age = Moment(startTime).fromNow();
    const primary = "Deck:" + deck.name + " distance: " + distance ? distance : 0 + "m";
    const secondary = age;
    const extra = null;
    return {primary,secondary,extra};    
};

const render = ({ doc, match, history }) => {
    const { formgroupstyle, formlabelstyle, containerstyle } = Meteor;
    const age = Moment(doc.startTime).fromNow();
    const xy = utils.trackingtoxy(doc, 150);
    const lastTime = doc.tracking&&doc.tracking.length?doc.tracking[doc.tracking.length - 1].timestamp:new Date();

    const dist = Distance(utils.getArrayPoints(doc.tracking));

    const time = Moment(lastTime).diff(doc.startTime?doc.startTime:new Date());
    const ms = Moment.duration(time).as('milliseconds');
    const avgspeed = dist / (ms / 3600000)
    const formattedTime = Moment.utc(ms).format("HH:mm:ss.SSS");
    return (doc ? (
        <div className="View">
            <svg>
                <polyline
                    points={xy}
                    stroke="red"
                    strokeWidth="3"
                    fill="none" />
            </svg>
            <div >
                <div><div style={{ fontWeight: "bold" }}>Tracked</div> {age}</div>
                <div><div style={{ fontWeight: "bold" }}>Distance</div> {Math.round(dist * 1000)} meters</div>
                <div><div style={{ fontWeight: "bold" }}>Time</div>{formattedTime}</div>
                <div><div style={{ fontWeight: "bold" }}>Points</div>{doc.tracking?doc.tracking.length:0}</div>
                <div><div style={{ fontWeight: "bold" }}>Avg speed</div>{avgspeed}</div>
                <div><div style={{ fontWeight: "bold" }}>Deck</div> {doc.deck.name}</div>
            </div>
        </div>
    ) :     <NotFound />);
};

export default {
    routes: [
        {
            path: "/"+Collection._name+"/new", component: createContainer(({ match }) => {
                const button = buttonStore.get();
                console.log(button);
                return {
                    Editor:NewTrack,
                    buttonStore,
                    button
                };
            }, New)
        },
        listRoute(Collection, renderDoc, ()=>(<IconButton variant="raised" color="primary" style={{color:"white"}} onClick={(e) => handleUpload(e)}><UploadIcon /></IconButton>), false, true),
        viewRoute(Collection, render, false, false),
    ]
};
