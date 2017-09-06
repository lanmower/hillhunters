import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SnackbarContent } from 'material-ui/Snackbar';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import Loading from '../../components/Loading/Loading';
import DocumentsCollection from '../../../api/Documents/Documents';
import Navigation from '../../components/Navigation/Navigation';

const handleRemove = (documentId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('documents.remove', documentId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Document deleted!', 'success');
      }
    });
  }
};

const Documents = ({ loading, documents, match, history }) => (!loading ? (
  <div className="Documents">
    <Navigation title={"Documents"} loading={loading} />
    <div className="page-header clearfix">
      <h4 className="pull-left">Documents</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add Document</Link>
    </div>
    {documents.length ? <Table responsive>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Last Updated</TableCell>
          <TableCell>Created</TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {documents.map(({ _id, title, createdAt, updatedAt }) => (
          <TableRow key={_id}>
            <TableCell>{title}</TableCell>
            <TableCell>{/*timeago(updatedAt)*/}</TableCell>
            <TableCell>{/*monthDayYearAtTime(createdAt)*/}</TableCell>
            <TableCell>
              <Button
                onClick={() => history.push(`${match.url}/${_id}`)}
                block
              >View</Button>
            </TableCell>
            <TableCell>
              <Button
                onClick={() => handleRemove(_id)}
                block
              >Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table> : <p>"No documents yet!"</p>}
  </div>
) : <Loading />);

Documents.propTypes = {
  loading: PropTypes.bool.isRequired,
  documents: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function GeTableCellocumentsContainer(Documents) {
  return createContainer(() => {
    const subscription = Meteor.subscribe('documents');
    return {
      loading: !subscription.ready(),
      documents: DocumentsCollection.find().fetch(),
    };
  }, Documents);
}
export default GeTableCellocumentsContainer(Documents);
