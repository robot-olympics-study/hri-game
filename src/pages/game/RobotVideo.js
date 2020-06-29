import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import YouTubePlayer from 'react-player/lib/players/YouTube'
import { rewards, rooms, successes, videos, roomOrder, roomList } from '../config.js';

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

class RobotVideo extends React.Component {
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
      playing: true
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
      <div className="RobotVideo">
        <h1> Denise's choice</h1>
        <Divider />
        <br />
        {!this.state.playing && !this.state.videoDone ?
          <div>
            Denise has chosen to attempt {rooms[this.props.action]} worth {rewards[this.row][this.props.action]} points.
            <img src={require('../../img/Room' + roomList[this.row][this.props.action] + '.PNG')} width="70%" alt="robotRoom"/>
            <br />
            Click the button to see the results.
            <br />
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
            Play Video
          </Button> : ""}
        <br />
        {this.state.videoDone && successes[this.row] && successes[this.row][this.props.action] > 0 ?
          `Denise succeeded! Your total score this round is ${this.props.roundScore} point(s).` : ""}
        {this.state.videoDone && successes[this.row] && successes[this.row][this.props.action] === 0 ?
          `Unfortunately, Denise failed this challenge. Your total score this round is still ${this.props.roundScore} point(s).` : ""}
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

export default withStyles(styles)(RobotVideo);
