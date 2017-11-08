import React from 'react';
import Navigation from '../components/Navigation';

const NotFound = () => (
  <div className="NotFound">
    <Navigation title="Not found"  />
    <p><strong>Error [404]</strong>: {window.location.pathname} does not exist.</p>
  </div>
);

export default NotFound;
