import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '/imports/client/components/Navigation';
import NotFound from "/imports/client/components/NotFound";

const render = ({ doc, Editor, history, loading }) => {
    console.log(Editor);
    return !loading?(doc ? (
        <div className="Edit">
            <Navigation title={`Editing "${doc.name}"`} loading={loading} />
            <Editor doc={doc} history={history} />
        </div>
    ) : <NotFound />):null;
};

export default render;