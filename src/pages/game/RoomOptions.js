import React from 'react';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

import { rewards, roomOrder, roomList } from '../config.js';

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
    paddingBottom: 6,
  },
  room: {
    width: '100%'
  },
  preview: {
    width: '60%'
  },
  bodyText: {
    color: "black",
    paddingBottom: 0,
  }
});

class RoomOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: 0
    }
    this.row = roomOrder[this.props.stage];
    this.images = [
      require('../../img/Room' + roomList[this.row][0] + '.PNG'),
      require('../../img/Room' + roomList[this.row][1] + '.PNG'),
      require('../../img/Room' + roomList[this.row][2] + '.PNG'),
      require('../../img/Room' + roomList[this.row][3] + '.PNG'),
    ]
    this.rooms = [[0, "Room A"], [1, "Room B"], [2, "Room C"], [3, "Room D"]]
  }

  updateState = (req, data) => {
    this.setState({
      [req]: data
    });
  }

  updatePreview = (room) => {
    this.setState({
      preview: room
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="Rooms">
        <div className={classes.header}>
          <h1>Room Selection</h1>
          <Divider />
          <br />
          {this.props.stage === 0 ?
            <div>
              Feel free to take a look at each of the rooms below.
              Once you’ve decided which room you’d like Denise to attempt, click on that room.
              <br/>
              Remember, you only get to choose one of these rooms.
              Hover over a room diagram to enlarge.
              <br />
            </div> : <div>
              Your team has {this.props.score} points so far! Time to choose another room for Denise to try. Feel free to check out the history if you need a reminder.
              <br /> Scroll down to see a history of the past actions.
            </div>}
          <br />
        </div>

        <Paper className={classes.paper}>
          <img className={classes.preview} src={this.images[this.state.preview]} alt="Enlarged" />
        </Paper>
        <br />

        <Grid container spacing={3}>
          {this.rooms.map((room, i) => (
            <Grid item xs={3} key={i}>
              <Paper className={classes.paper}>
                <img className={classes.room} src={this.images[room[0]]} alt={room[1]}
                  onMouseOver={() => this.updatePreview(room[0])} />
                <div className={classes.bodyText}>
                  Reward: {rewards[this.row][i]}pts
                </div>
              </Paper>
              <br />
              <Button variant="contained" color="primary" className={classes.button}
                onClick={() => this.props.nextPage(room[0])}>
                {room[1]}
              </Button>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(RoomOptions);
