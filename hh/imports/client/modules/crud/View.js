import React from 'react';
import NotFound from "/imports/client/components/NotFound";
import Navigation from '/imports/client/components/Navigation';
const render = ({ loading, ViewContent, match, history, doc }) => {
  return (doc ? (
    <div className="View">
      <Navigation title={"View"} loading={loading} />
      {loading ? "Loading..." : (<div>
          <ViewContent doc={doc} match={match} history={history}></ViewContent>
      </div>
      )}
      </div>

  ) : <NotFound />);
};
export default render;