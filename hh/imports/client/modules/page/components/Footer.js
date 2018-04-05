import React from 'react';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';

const Footer = () => (
  <div className="Footer">
    <Grid>
      <p className="pull-left">&copy; {2017} Hill Hunters</p>
      <ul className="pull-right">
        <li><Link to="/terms">Terms of Service</Link></li>
        <li><Link to="/privacy">Privacy Policy</Link></li>
      </ul>
    </Grid>
  </div>
);

Footer.propTypes = {};

export default Footer;
