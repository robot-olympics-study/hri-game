import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import YouTubePlayer from 'react-player/lib/players/YouTube'
import { rewards, rooms, successes, videos, roomOrder } from '../config.js';

const styles = theme => ({
  card: {
    minWidth: 275,
    marginBottom: 20,
    padding: 18,
  },
  title: {
    fontSize: 14,
  },
  header: {
    fontSize: 18,
  },
  button: {
    margin: theme.spacing(1) * 2,
  },
  textBox: {
    paddingLeft: 70,
    paddingRight: 70,
  },
  textBoxHeader: {
    fontWeight: 'bold',
    fontSize: 16,
  }
});

class HumanVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      playtime: 0,
      videoDone: false,
    }
    this.row = roomOrder[this.props.stage];
  }

  playVideo = () => {
    this.props.scrollTop();
    this.setState({
      playing: true,
    });
  }

  updateState = (req, data) => {
    this.setState({[req]: data.played}, () => {
        const vid = this.state.playtime > 0.99 || this.state.videoDone || !this.props.valid
        this.setState({ videoDone: vid })
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="humanVideo">
        <h1> Your choice</h1>
        <Divider />
        <br />
        Denise received your decision to attempt {rooms[this.props.action]} worth {rewards[this.row][this.props.action]} points.
        <br />
        <br />
        {!this.state.playing ?
          <div className={classes.textBox}>
            <div className={classes.textBoxHeader}>
              Please explain why you chose {rooms[this.props.action]} for Denise to attempt.
            </div>
            <TextField
              id="outlined-multiline-flexible"
              label="Response"
              multiline
              fullWidth
              rows="6"
              rowsMax="20"
              onChange={this.props.saveText('H' + this.row)}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </div> : ""}
        {!this.state.playing ?
          <div>
            Click the button to submit your response and see the results.
        </div> : ""}
        {this.state.playing ?
          <div className="player-wrapper">
            <center>
              <YouTubePlayer
                className='react-player'
                url={videos[this.row] ? videos[this.row][this.props.action] : ""}
                playing={this.state.playing}
                controls={!this.props.valid}
                onProgress={(time) => this.updateState("playtime", time)}
                ref={player => {
                  this.player = player;
                }} />
            </center>
          </div> : ""}

        {!this.state.playing ?
          <Button variant="contained" color="primary" className={classes.button} onClick={this.playVideo}>
            Submit &amp; Play
          </Button> : ""}
        <br />
        {this.state.videoDone && successes[this.row][this.props.action] > 0 ?
          `Congrats! You have won ${this.props.roundScore} point(s). Click continue to see which room Denise will choose!` : ""}
        {this.state.videoDone && successes[this.row][this.props.action] === 0 ?
          `Unfortunately, Denise failed this challenge, so the team earned 0 points. Now, Denise will choose a room to attempt!` : ""}
        {this.state.videoDone ?
          <div className="buttons">
            <Button variant="contained" color="primary" className={classes.button} onClick={() => this.player.seekTo(0, "seconds")}>
              Replay
            </Button>
            <Button variant="contained" color="primary" className={classes.button} onClick={this.props.nextPage}>
              Continue
            </Button>
          </div> : ""}

        {this.state.playtime > 0 && !this.state.videoDone ? "Finish watching the video to proceed." : ""}
      </div>

    );
  }
}

export default withStyles(styles)(HumanVideo);
