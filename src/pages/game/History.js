import React from 'react';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

import { rewards, successes } from '../config.js'

const styles = theme => ({
  card: {
    minWidth: 275,
    marginBottom: 20,
    padding: 18,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  room: {
    width: '100%'
  },
  preview: {
    width: '50%'
  },
  bodyText: {
    color: "black"
  }
});

class History extends React.Component {
  constructor(props) {
    super(props);
    this.ids = this.props.history.map((action, i) => Math.floor(i / 2) * 4 + action);
    this.images = this.ids.map(num => require(`../../img/Room${num}.PNG`));
    this.rooms = [[0, "Room A"], [1, "Room B"], [2, "Room C"], [3, "Room D"]];
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="Rooms">
        <div className={classes.header}>
          <h1>Room History</h1>
          <Divider />
        </div>
        <br />
        <Grid container spacing={3}>
          {this.images.map((img, i) => (
            <Grid item xs={3} key={i}>
              <Paper className={classes.paper}>
                <img className={classes.room} src={img} alt={String(i % 4)} />
                <div className={classes.bodyText}>
                  {i % 2 === 0 ? "You - " : "Denise - "}
                  {successes[Math.floor(i / 2)][this.props.history[i]] === 1 ? 
                    "Success (+" + rewards[Math.floor(i / 2)][this.props.history[i]] + "pts)" : 
                    "Failure (+0 pts)"}
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(History);
