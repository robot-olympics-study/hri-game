import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import IntroVideo from './IntroVideo.js';
import MuiSlider from './inputs/MuiSlider.js';
import MuiDropdown from './inputs/MuiDropdown.js';
import MuiRadio from './inputs/MuiRadio.js';
import { DEBUG_MODE } from '../config.js';


const styles = theme => ({
  button: {
    margin: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  body: {
    textAlign: 'left'
  }
});

class Intro extends React.Component {
  constructor(props) {
    super(props);
    if (props.cookies.get("started")) {
      console.log("Game detected.");
      this.state = {
        name: '',
        screen: -1,
        checked: true
      }
    } else {
      this.state = {
        name: '',
        screen: 0,
        checked: true
      }
    }
  }

  nextScreen = () => {
    if (this.state.screen === -1) {
      this.props.clearCookies();
    }
    if (this.state.screen === 4) {
      this.props.nextPage();
    }
    this.setState((state) => { return { screen: state.screen + 1 } });

  }

  changeValid = () => {
    this.setState(state => {
      const validData = !state.checked
      return { checked: validData }
    });
    this.props.validData();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.state.screen === -1 ?
          <div>
            <h2>Welcome back {this.props.cookies.get("name")}</h2>
            We have detected that you have previously begun a game with Denise on this computer.
            <img src={require(`../../img/denise.jpg`)} width="80%" alt="Denise" />
            <br />
            Click continue to load your previous game or start over to begin a new game.
          </div>
          : ""}
        {this.state.screen === 0 ?
          <div>
            Thanks for volunteering to help us test our program!
            <br /><br />
            Meet Denise, your teammate for today.
            <img src={require(`../../img/denise.jpg`)} width="80%" alt="Denise" />
            <br />
            Note that you must be playing the game on a computer/laptop (the site does not load correctly on mobile).
          </div> : ""}
        {this.state.screen === 1 ?
          <div>
            <h2> Please start by telling us a little about yourself.</h2>

            <MuiDropdown
              name="Age"
              question="What is your age?"
              onChange={this.props.saveDropdown("Q1")}
              data={['15-19', '20-24', '25-29', '30-39', '40-49', '50-59', '60-69', '70+']}
            />
            <MuiDropdown
              name="Gender"
              question="I identify as"
              onChange={this.props.saveDropdown("Q2")}
              data={['Male', 'Female', 'Non-binary', 'Other', 'Prefer not to respond']}
            />
            < h3> For the following questions, think about times when you have played different kinds of games, <br />
             including board/card games and video games.</h3>

            <MuiSlider
              question="I like to take risks when playing games."
              marks={5}
              onChange={this.props.saveSlider("Q3")} />

            <MuiSlider
              question="I am good at weighing risk vs. reward when playing games."
              marks={5}
              onChange={this.props.saveSlider("Q4")} />

            <MuiSlider
              question="I like to take the safe option when playing games."
              marks={5}
              onChange={this.props.saveSlider("Q5")} />

            <MuiRadio
              question="Describe your experience with working with computers by choosing the item below that describes you best."
              choices={["(1) I know some things about how computers work beneath the surface. (Maybe you know about networking, OS-level stuff, or GUI window managers, for example.) ",
                "(2) I’m comfortable with the things listed below, plus I have done some computer programming (this includes using programs like Matlab).",
                "(3) I’m comfortable changing settings or installing new things myself on my computer.",
                "(4) I’m comfortable browsing the internet or using a word processor like Microsoft Word",
                "(5) I’m not very comfortable with any of this stuff."]}
              onChange={this.props.saveRadio("Q6")} />
            <MuiRadio
              question="Describe your experience with robots by choosing the item below that describes you best."
              choices={["(1) I have experience building or programming a robot.",
                "(2) I have experience controlling or operating a robot.",
                "(3) I have experience driving remote-control devices (e.g., remote-control cars/planes/helicopters, robotic toys).",
                "(4) I have personally been around a robot before.",
                "(5) I have seen video of a robot before.",
                "(6) I have only seen robots on TV or in the movies",
                "(7) I have heard the term 'robot' in conversation, but that's it.",
                "(8) I have never seen a robot anywhere."]}
              onChange={this.props.saveRadio("Q7")} />
          </div> : ""}
        {this.state.screen === 2 ?
        <IntroVideo nextScreen={this.nextScreen} valid={!DEBUG_MODE}/> : ""}
        {this.state.screen === 3 ?
          <div>
            You and Denise will be representing the Interaction Lab in the Robot Olympics.
            <br />
            You will be serving as Denise’s teammate, working together with her to score as many points as possible.
            <br />
            You will help Denise decide which feats to attempt.
            <br />
            <img src={require(`../../img/robot_olympics.png`)} width="80%" alt="robot_olympics" />
            <br />
            The Olympic events require a variety of different capabilities.
            <br />
            <br />
            We don’t know how many of these capabilities Denise has, or which ones.
            <br />
            <strong>Denise *does* know which capabilities she has.</strong>
            <br />
            </div> : ""}
        {this.state.screen === 4 ?
          <div>
            <p>
              The Olympics work in two stages.
              Your team will be shown a few different challenges for Denise to attempt.
          <br />
          Each challenge, if completed successfully, will win a specified number of points for your team.
          Failed attempts earn zero points.
          <br /><br />
          When you’re ready, we’ll show you the different challenges.
          But first, let us know whether it's your first time playing!
          </p>
            <strong>
              Please do not hit the back button in your browser.
          </strong>
            <br />
            {this.props.setName('Player')}
            <br />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked}
                  onChange={this.changeValid}
                  color="primary"
                />
              }
              label="This is my first time playing this game"
            />
            <br />
          </div> : ""}
        {this.state.screen === -1 ?
          <Button variant="contained" color="primary" className={classes.button}
            onClick={this.props.loadCookies}>
            Continue
        </Button> : ""}
        <Button variant="contained" color="primary" className={classes.button}
          onClick={this.nextScreen}
          disabled={(
            this.state.screen === 1 && !this.props.demographicsDone()
          )} >
          {this.state.screen === -1 ? "Start Over" : "Continue"}
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(Intro);
