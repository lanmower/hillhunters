import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Decks from '/imports/api/Decks/Decks';
import NotFound from '../../page/pages/NotFound';

import Loading from '../../page/components/Loading';
import Navigation from '../../page/components/Navigation';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';

const handleRemove = (deckId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('decks.remove', deckId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Deck deleted!', 'success');
        history.push('/decks');
      }
    });
  }
};

const ViewDeck = ({ doc, match, history, loading }) => {
  const { formgroupstyle, formlabelstyle, containerstyle } = Meteor;
  return (doc ? (
    <div className="ViewDeck">
      <Navigation title={`Viewing "${doc.name}"`} loading={loading} />
      <div style={containerstyle}>
        <div className="page-header clearfix">
          <Button fab style={{ margin: 0, top: 'auto', right: 20, bottom: 20, left: 'auto', position: 'fixed' }} color="primary" aria-label="add" onClick={() => history.push(`${match.url}/edit`)}>
            <EditIcon />
          </Button>
          <IconButton className="raised" onClick={() => handleRemove(doc._id, history)} aria-label="Delete" style={{ float: "right" }}>
            <DeleteIcon />
          </IconButton>
        </div>
        <div style={formgroupstyle}>
          <div style={formlabelstyle}>
            Name
          </div>
          {doc.name}
        </div>
        <div style={formgroupstyle}>
          <div style={formlabelstyle}>
            Shape
          </div>
          <img style={{ height: "2em" }} src={"/images/shapes/" + doc.shape + ".png"} alt={doc.shape} />
        </div>
        <div style={formgroupstyle}>
          <div style={formlabelstyle}>
            Edge
          </div>
          <img style={{ height: "2em" }} src={"/images/edges/" + doc.edge + ".png"} alt={doc.edge} />
        </div>
        <div style={formgroupstyle}><div style={formlabelstyle}>
          Mount
        </div>
          <img style={{ height: "2em" }} src={"/images/mount/" + doc.mount + ".png"} alt={doc.mount} />
        </div>
        <div style={formgroupstyle}>
          <div style={formlabelstyle}>
            Curve
          </div>
          <img style={{ height: "2em" }} src={"/images/curves/" + doc.curve + ".png"} alt={doc.curve} />
        </div>
        <div style={formgroupstyle}>
          <div style={formlabelstyle}>
            Wheels
          </div>
          <div>
            <img style={{ height: "2em" }} src={"/images/orientations/left/" + doc.orientationleft + ".png"} alt={doc.orientationLeft} />
            <img style={{ height: "2em" }} src={"/images/orientations/right/" + doc.orientationright + ".png"} alt={doc.orientationRight} />
          </div>
        </div>
        <div style={formgroupstyle}>
          <div style={formlabelstyle}>
            Grip tape
          </div>
          {doc.griptape}
        </div>
        <div style={formgroupstyle}>
          <div style={formlabelstyle}>
            Bushing hardness
          </div>
          {doc.bushingHardness}
        </div>
      <div style={formgroupstyle}>
        <div style={formlabelstyle}>
          Wheel hardness
        </div>
        {doc.wheelhardness}
      </div>
        <div style={formgroupstyle}>
          <div style={formlabelstyle}>
            Wheel size
          </div>
          {doc.wheelsize}
        </div>
        <div style={formgroupstyle}>
          <div style={formlabelstyle}>
            Bearings
          </div>
          {doc.bearings}
        </div>
        
      </div>
    </div>
  ) : <NotFound />)
}



ViewDeck.propTypes = {
  loading: PropTypes.bool.isRequired,
  doc: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const deckId = match.params._id;
  const subscription = Meteor.subscribe('decks.view', deckId);

  return {
    loading: !subscription.ready(),
    doc: Decks.findOne(deckId) || {},
  };
}, ViewDeck);
