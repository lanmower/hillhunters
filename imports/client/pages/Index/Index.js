import React from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import Navigation from '../../components/Navigation/Navigation';

class Index extends React.Component {
  render() {
    return (
      <div className="Index">
        <Navigation title="Home" />
        {this.props.title}
        <h1>Hill Hunters</h1>
        <p>The skating community.</p>
      </div>
    );
  }
}

Index.propTypes = {
  title: PropTypes.string,
};

export default Index;
