import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '/imports/client/components/Navigation';

const render = ({ doc, Editor, history }) => {
    return (
        <div className="New">
            <Navigation title="New" />
            <Editor history={history} />
        </div>
    );
};

export default render;