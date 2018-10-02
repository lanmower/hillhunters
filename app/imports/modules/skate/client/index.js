import React from 'react';
import Collection from '../collection';
import ListDoc from '../../crud/client/ListDoc';
import { Meteor } from 'meteor/meteor';
import Loading from '/imports/client/components/Loading';
import IconButton from '@material-ui/core/IconButton';
import Moment from 'moment';
import Distance from 'gps-distance';
import Graph from '/imports/client/components/Graph';//graph
import utils from '../../utils.js';
import {viewRoute, listRoute} from '../../crud/client/crudRoutes.js';
const renderDoc = (doc) => {
    const { _id, startTime, deck, distance, tracking, stop } = doc;
    const age = Moment(startTime).fromNow();
    //const data = utils.xyarraytoobject(utils.trackingtoxy(this.props, 200));
    const primary = "Deck:" + deck.name;
    const secondary =  age;
    const extra = <div><br/>{(distance ? distance : 0) + "m"}</div>//(<svg><Graph points={data} /></svg>);
    console.log(primary, secondary, extra);
    return {primary, secondary, extra};
};

const render = ({ doc, match, loading }) => {
    const button = ((docs.length && connected) ? <IconButton onClick={(e) => this.handleUpload(e)} style={{ marginRight: "0px", marginLeft: "auto" }} aria-label="Upload"><UploadIcon /></IconButton> : false);
    const age = Moment(doc.startTime).fromNow();
    const data = utils.xyarraytoobject(utils.trackingtoxy(doc, 200));
    console.log(data);
    const lastTime = doc.tracking[doc.tracking.length - 1].timestamp;

    const dist = Distance(utils.getArrayPoints(doc.tracking));

    const time = Moment(lastTime).diff(doc.startTime);
    const ms = Moment.duration(time).as('milliseconds');
    const avgspeed = dist / (ms / 3600000)
    const formattedTime = Moment.utc(ms).format("HH:mm:ss.SSS");
    const body = (
        <div>
            <svg><Graph points={data} /></svg>
            <div><div style={{ fontWeight: "bold" }}>Name</div> {age}</div>
            <div><div style={{ fontWeight: "bold" }}>Deck</div> {doc.deck.name}</div>
        </div>
    );
    return (
        <View loading={loading} body={body}>
        </View>
    )

};

export default {
    routes: [
        listRoute(Collection, renderDoc, null, true, false),
        viewRoute(Collection, render)
    ]
};
