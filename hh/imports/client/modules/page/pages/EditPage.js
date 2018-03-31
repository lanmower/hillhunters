import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Pages from '/imports/api/Pages/Pages';
import PageEditor from '../components/PageEditor';
import NotFound from '../../page/pages/NotFound';
import Navigation from '../../page/components/Navigation';
 //   <Navigation title={`Editing "${doc.name}"`} loading={loading} />
const EditPage = ({ doc, history, loading }) => (doc ? (
  <div className="EditPage">
    <PageEditor doc={doc} history={history} />
  </div>
) : <div></div>);

EditPage.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe('pages.view', documentId);
  return {
    loading: !subscription.ready(),
    doc: Pages.findOne(documentId),
  };
}, EditPage);
