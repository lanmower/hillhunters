import React from 'react';
import Navigation from '/imports/client/components/Navigation';

const Logout = () => (
  <div className="Logout">
  <Navigation title="Sign out" />
  <h1>You are signed out.</h1>
  </div>
);

Logout.propTypes = {};

export default Logout;
