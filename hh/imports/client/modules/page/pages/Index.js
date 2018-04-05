import React from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import Navigation from '../components/Navigation';

class Index extends React.Component {
  render() {
    return (
      <div className="Index">
        <Navigation title="Home" />
        {this.props.title}
<<<<<<< HEAD:imports/client/modules/page/pages/Index.js
=======
        <h1></h1>
>>>>>>> 16d8289678201a58cf96669a4eabde82c7718c83:hh/imports/client/modules/page/pages/Index.js
        <p>The skating community.</p>
      </div>
    );
  }
}

Index.propTypes = {
  title: PropTypes.string,
};

export default Index;
