import React from 'react';
import PropTypes from 'prop-types';
import PageEditor from '../components/PageEditor';
import Navigation from '../../page/components/Navigation';
import { createContainer } from 'meteor/react-meteor-data';

const NewPage = ({ thread, history }) => (
  <div className="NewPage">
    <Navigation title="New Page"/>
    <PageEditor history={history} />
  </div>
);

NewPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
    return {
      loading: false
    };
  }, NewPage);
