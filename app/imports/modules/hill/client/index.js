import Collection from '../collection';
import ListDoc from '../../crud/client/ListDoc';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
  import IconButton from '@material-ui/core/IconButton';
import Moment from 'moment';
import Distance from 'gps-distance';
import Graph from '/imports/client/components/Graph';//graph
import utils from '/imports/modules/utils.js';
import {viewRoute, listRoute} from '../../crud/client/crudRoutes.js';

const listItem = ({ _id, startTime, deck, distance, tracking, stop }) => {
  const primary = "Deck:" + deck.name + " distance: " + distance ? distance : 0 + "m";
  const secondary = age;
  const extra = (<svg><Graph points={data} /></svg>);
  return (
    <ListDoc primary={primary} secondary={secondary} extra={extra} >
    </ListDoc>
  )
};


const render = ({ doc, match, loading }) => {
    const button = ((docs.length && connected) ? <IconButton onClick={(e) => this.handleUpload(e)} style={{ marginRight: "0px", marginLeft: "auto" }} aria-label="Upload"><UploadIcon /></IconButton> : false);
    const age = Moment(doc.startTime).fromNow();
    const data = utils.xyarraytoobject(utils.trackingtoxy(doc, 200));
    console.log(data);
    const time = Moment(lastTime).diff(doc.startTime);
    const ms = Moment.duration(time).as('milliseconds');
    const avgspeed = dist / (ms / 3600000)
    const formattedTime = Moment.utc(ms).format("HH:mm:ss.SSS");
    const body = (
        <div>
            <svg><Graph points={data} /></svg>
            <div><div style={{ fontWeight: "bold" }}>Age</div> {age}</div>
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
      listRoute(Collection, listItem, null, true, false),
      viewRoute(Collection, render)
    ]
};
