import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import YouTubePlayer from 'react-player/lib/players/YouTube'
import { introVideoUrl, DEBUG_MODE } from '../config.js';

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

class IntroVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      playtime: 0,
      videoDone: false,
    }
  }

  playVideo = () => {
    this.setState({
      playing: true,
    });
  }

  updateState = (req, data) => {
    this.setState({[req]: data.played}, () => {
        const vid = this.state.playtime > 0.99 || this.state.videoDone || DEBUG_MODE
        this.setState({ videoDone: vid })
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="introVideo">
        <h1> Instructions </h1>
        <Divider />
        <br />
        Please start by watching this instructional video. You must watch the entire video to proceed!
        <br />
        <br />
        {this.state.playing ?
          <div className="player-wrapper">
            <center>
              <YouTubePlayer
                className='react-player'
                url={introVideoUrl}
                playing={this.state.playing}
                controls={DEBUG_MODE}
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
        {this.state.videoDone ?
          <div className="buttons">
            <Button variant="contained" color="primary" className={classes.button} onClick={() => this.player.seekTo(0, "seconds")}>
              Replay
            </Button>
            <Button variant="contained" color="primary" className={classes.button} onClick={this.props.nextScreen}>
              Continue
            </Button>
          </div> : ""}

        {this.state.playtime > 0 && !this.state.videoDone ? "Finish watching the video to proceed." : ""}
      </div>

    );
  }
}

export default withStyles(styles)(IntroVideo);
