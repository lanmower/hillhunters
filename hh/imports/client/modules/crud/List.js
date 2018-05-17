import React from 'react';
import PropTypes from 'prop-types';
import Navigation, {buttonStore} from '/imports/client/components/Navigation';
import List from 'material-ui/List';
import ListDoc from './ListDoc';
import { withStyles } from 'material-ui/styles';
import AddButton from './AddButton';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';


const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});
const render = ({ docs, match, history, loading, renderDoc, button, Collection, classes }) => {

  const buttonComp = ()=>(<div>{button?button(history, Collection):null}{AddButton?AddButton(history, Collection):null}</div>)
  buttonStore.set(buttonComp());
  return (
    <Paper className={classes.root} elevation={0}>
      <Navigation title={Collection._name} loading={loading} />
      {docs.length ? <List>
        {
          docs.map((doc)=>{
            const info = renderDoc(doc);
            return (
          <ListDoc key={doc._id} _id={doc._id} info={info} doc={doc} history={history} match={match} Collection={Collection}></ListDoc>)
        })
        }
      </List>
        
        : <div>
         <Typography type="body1" component="p">
            No {Collection._name} found.
          </Typography>
        </div>}
    </Paper>
  );

}
export default withStyles(styles)(render);