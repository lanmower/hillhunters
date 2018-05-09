import Collection from '/imports/api/Tracks';
import ListDoc from '../crud/ListDoc';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Loading from '/imports/client/components/Loading';
import IconButton from 'material-ui/IconButton';
import Moment from 'moment';
import Distance from 'gps-distance';
import Graph from '/imports/client/components/Graph';//graph
import utils from '/imports/utils.js';
import {listRoute, viewRoute} from '../crud/crudRoutes.js';

const renderDoc = ({ match, history, deck, distance, stop, startTime, _id }) => {
    const age = Moment(startTime).fromNow();
    const primary = "Deck:" + deck.name + " distance: " + distance ? distance : 0 + "m";
    const secondary = age;
    return (
        <ListDoc primary={primary} secondary={secondary} extra={extra} >
        </ListDoc>
    )
};

const render = ({ doc, match, history, loading }) => {
    const { formgroupstyle, formlabelstyle, containerstyle } = Meteor;
    const age = Moment(doc.startTime).fromNow();
    const xy = utils.trackingtoxy(doc, 150);
    const lastTime = doc.tracking[doc.tracking.length - 1].timestamp;

    const dist = Distance(utils.getArrayPoints(doc.tracking));

    const time = Moment(lastTime).diff(doc.startTime);
    const ms = Moment.duration(time).as('milliseconds');
    const avgspeed = dist / (ms / 3600000)
    const formattedTime = Moment.utc(ms).format("HH:mm:ss.SSS");
    return (doc ? (
        <div className="View">
            <Navigation title={"View track"} loading={loading} />
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
                <div><div style={{ fontWeight: "bold" }}>Points</div>{doc.tracking.length}</div>
                <div><div style={{ fontWeight: "bold" }}>Avg speed</div>{avgspeed}</div>
                <div><div style={{ fontWeight: "bold" }}>Deck</div> {doc.deck.name}</div>
            </div>
        </div>
    ) : <NotFound />);
};


export default {
    routes: [
        listRoute(Collection, renderDoc),
        viewRoute(Collection, render)
    ],
    Collection
};
