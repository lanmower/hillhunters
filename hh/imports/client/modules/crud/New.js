import React from 'react';
import PropTypes from 'prop-types';
import Navigation, {button} from '/imports/client/components/Navigation';

const render = ({ doc, Editor, history, defaultButton }) => {
    if(defaultButton) button.set(defaultButton);
    return (
        <div className="New">
            <Navigation title="New"/>
            <Editor history={history}/>
        </div>
    );
};

export default render;