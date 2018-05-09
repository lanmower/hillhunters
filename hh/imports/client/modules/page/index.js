import Collection from '/imports/api/Decks';
import ListDoc from '../crud/ListDoc';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Loading from '/imports/client/components/Loading';
import IconButton from 'material-ui/IconButton';
import Moment from 'moment';
import Distance from 'gps-distance';
import Graph from '/imports/client/components/Graph';//graph
import utils from '/imports/utils.js';
import {viewRoute, listRoute, newRoute, editRoute} from '../crud/crudRoutes.js';
import Editor from './Editor';
const renderDoc = ({ _id, title, body }) => {
    const primary = title;
    const secondary = Moment(createdAt).fromNow();
    const extra = null;
    return (
        <ListDoc primary={primary} secondary={secondary} extra={extra} >
        </ListDoc>
    )
};


const render = ({ doc, match, loading }) => {
    const body = (
        <div>
            {doc.nonav ? <Navigation title={doc.title} loading={loading} /> : ''}
            {doc.length ? <div>
                {doc.map(({ _id, body }) => {
                    return (
                        <ReactMarkdown key={_id} source={body} />
                    )
                }
                )}
            </div> : null
            }
        </div>
    );
    return (
        <View loading={loading} body={body}>
        </View>
    )

};

export default {
    routes: [
        viewRoute(Collection, render),
        editRoute(Collection, Editor),
        newRoute(Collection, Editor),
        listRoute(Collection, renderDoc)
    ]
};
