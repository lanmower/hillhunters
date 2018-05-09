import React from 'react';
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
import Editor from './Editor.js';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';
import Typography from 'material-ui/Typography';

const addButton = (history) => {
    return (<Button aria-label="add" onClick={()=>{history.push('/'+Collection._name+'/new')}}>
      <AddIcon />
    </Button>);
}

const renderDoc = ({ _id, name, shape, createdAt, updatedAt }) => {
    const primary = name;
    const secondary = Moment(createdAt).fromNow();
    const extra = null;
    return (
        <ListDoc key={_id} primary={primary} secondary={secondary} extra={extra} >
        </ListDoc>
    )
};

const ViewContent = ({ doc, match, history, loading }) => {
   // const age = Moment(doc.startTime).fromNow();
    return (
    <div>
        <div className="page-header clearfix">
            <IconButton className="raised" onClick={() => history.push(`${match.url}/edit`)} aria-label="Delete" style={{ float: "right" }}>
                <EditIcon />
            </IconButton>
            <IconButton className="raised" onClick={() => handleRemove(doc._id, history)} aria-label="Delete" style={{ float: "right" }}>
                <DeleteIcon />
            </IconButton>
    </div>
    <Typography variant="body1" gutterBottom>
    <Typography variant="subheading" gutterBottom>
        Name
        </Typography>
            {doc.name}
        </Typography>
    <Typography variant="body1" gutterBottom>
    <Typography variant="subheading" gutterBottom>
        Shape
        </Typography>
            <img style={{ height: "2em" }} src={"/images/shapes/" + doc.shape + ".png"} alt={doc.shape} />
        </Typography>
    <Typography variant="body1" gutterBottom>
    <Typography variant="subheading" gutterBottom>
        Edge
        </Typography>
            <img style={{ height: "2em" }} src={"/images/edges/" + doc.edge + ".png"} alt={doc.edge} />
        </Typography>
    <Typography variant="body1" gutterBottom>
    <Typography variant="subheading" gutterBottom>
        Mount
        </Typography>
            <img style={{ height: "2em" }} src={"/images/mount/" + doc.mount + ".png"} alt={doc.mount} />
        </Typography>
    <Typography variant="body1" gutterBottom>
    <Typography variant="subheading" gutterBottom>
        Curve
        </Typography>
                    <img style={{ height: "2em" }} src={"/images/curves/" + doc.curve + ".png"} alt={doc.curve} />
        </Typography>
    <Typography variant="body1" gutterBottom>
    <Typography variant="subheading" gutterBottom>
        Wheels
        </Typography>
            <div>
                <img style={{ height: "2em" }} src={"/images/orientations/left/" + doc.orientationleft + ".png"} alt={doc.orientationLeft} />
                <img style={{ height: "2em" }} src={"/images/orientations/right/" + doc.orientationright + ".png"} alt={doc.orientationRight} />
            </div>
        </Typography>
    <Typography variant="body1" gutterBottom>
        <Typography variant="subheading" gutterBottom>
            Grip tape
        </Typography>
        {doc.griptape}
    </Typography>
    <Typography variant="body1" gutterBottom>
        <Typography variant="subheading" gutterBottom>
            Bushing hardness
        </Typography>
        {doc.bushingHardness}
    </Typography>
    <Typography variant="body1" gutterBottom>
        <Typography variant="subheading" gutterBottom>
            Wheel hardness
        </Typography>
        {doc.wheelhardness}
    </Typography>
    <Typography variant="body1" gutterBottom>
        <Typography variant="subheading" gutterBottom>
            Wheel size
        </Typography>
        {doc.wheelsize}
    </Typography>
    <Typography variant="body1" gutterBottom>
        <Typography variant="subheading" gutterBottom>
            Bearings
        </Typography>
        {doc.bearings}
    </Typography>
</div>
    );
};
console.log(Collection);
export default {
    routes: [
        newRoute(Collection, Editor),
        viewRoute(Collection, ViewContent, false),
        editRoute(Collection, Editor, false),
        listRoute(Collection, renderDoc, addButton, false)
    ]
};

