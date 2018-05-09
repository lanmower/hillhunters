import React from 'react';
import Navigation from '/imports/client/components/Navigation';

const NotFound = () => (
  <div className="NotFound">
    <p><strong>Error [404]</strong>: {window.location.pathname} does not exist.</p>
  </div>
);

export default NotFound;
