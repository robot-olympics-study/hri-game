import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { MAX_ROOMS } from '../config.js';

import MuiSlider from './inputs/MuiSlider.js'
import MuiRadio from './inputs/MuiRadio.js';

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

class End extends React.Component {
  constructor(props) {
    super(props);
    this.state = { submitted: false }
  }

  submit = () => {
    this.setState({ submitted: true });
    this.props.sendData();
    this.props.clearCookies();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="debrief">
        {!this.state.submitted ?
          <div className="questions">
            <h1>Wrap Up</h1>
            <Divider />
            <br />
            Thanks so much for representing the lab! You and Denise made a great team.
            <br /><br />
            Over the course of {MAX_ROOMS} rounds, your team  scored {this.props.totalScore} points!
            <br />
            <br />
            <div className={classes.textBox}>
              <div className={classes.textBoxHeader}>
              Describe how you think Denise chose rooms. Was there a particular strategy or pattern?
              <br/>
              Did she make mistakes? Was she clever, foolish, or mindless?
              </div>
              <TextField
                id="outlined-multiline-flexible"
                label="Response"
                multiline
                fullWidth
                rows="6"
                rowsMax="20"
                onChange={this.props.saveText("D1")}
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </div>
            <br />
            <div className={classes.textBox}>
              <div className={classes.textBoxHeader}>
              Tell us about any times where you felt confused or unsure about the game rules, or how the game works.
              <br/>
              Tell us what you decided to do, and how your uncertainty might have impacted your thinking.
              </div>
              <TextField
                id="outlined-multiline-flexible"
                label="Response"
                multiline
                fullWidth
                rows="6"
                rowsMax="20"
                onChange={this.props.saveText("D2")}
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </div>
            <br />

            <MuiSlider
              question="[Rate your level of certainty] Denise is able to understand simple audio commands in spoken English."
              marks={7}
              onChange={this.props.saveSlider("A1")}/>
            <MuiSlider
              question="[Rate your level of certainty] Denise is able to identify and follow a particular color."
              marks={7}
              onChange={this.props.saveSlider("A2")}/>
            <MuiSlider
              question="[Rate your level of certainty] Denise is able to detect faces."
              marks={7}
              onChange={this.props.saveSlider("A3")}/>
            <MuiSlider
              question="[Rate your level of certainty] Denise is able to identify a particular object from several options."
              marks={7}
              onChange={this.props.saveSlider("A4")}/>
            <MuiSlider
              question="[Rate your level of certainty] Denise is able to locate and drive towards the origin of a noise."
              marks={7}
              onChange={this.props.saveSlider("A5")}/>
            <MuiSlider
              question="[Rate your level of certainty] Denise is able to navigate without hitting a wall even when her eyes are covered."
              marks={7}
              onChange={this.props.saveSlider("A6")}/>
            <br />
            <MuiRadio
              question="Before choosing an event, I studied the four options until I understood them as best as I could"
              choices={["Never",
                "Sometimes but not always",
                "Every time"]}
              onChange={this.props.saveRadio("E1")} />
            <MuiRadio
              question="After I was done looking at the event options, I thought carefully about which of them to choose."
              choices={["Strongly disagree",
                "Disagree",
                "Slightly disagree",
                "Neutral",
                "Slightly agree",
                "Agree",
                "Strongly agree"]}
              onChange={this.props.saveRadio("E2")} />
            <MuiRadio
              question="How many times did you ignore the reward points when choosing an event? For example, choosing an event just to see if Denise could do it."
              choices={["Never",
                "Sometimes but not always",
                "Every time"]}
              onChange={this.props.saveRadio("E3")} />
          <MuiRadio
            question="On average, how risky vs. safe were you when choosing an event? I.e., how much did you *gamble* to try to win more points when you weren’t sure about Denise’s abilities?"
            choices={["Safest - when possible, only chose events that I *knew* Denise could complete",
              "Safer",
              "Balanced",
              "Riskier",
              "Riskiest - always chose the highest possible points if there was any chance that Denise would succeed"]}
            onChange={this.props.saveRadio("E4")} />
            <MuiRadio
              question="Did you ever look at the history of past choices made by you and Denise?"
              choices={["No",
                "Yes -- once or twice",
                "Yes -- more than twice"]}
              onChange={this.props.saveRadio("E5")} />
            <MuiRadio
              question="Did forgetfulness hurt your score? I.e., do you think you would have been able to make better choices if you had studied the history, or been able to watch some of the videos again?"
              choices={["Never",
                "Sometimes but not always",
                "Every time"]}
              onChange={this.props.saveRadio("E6")} />

            <div className={classes.textBox}>
              <div className={classes.textBoxHeader}>
              Did you find the game particularly engaging or tedious? What would have made the game more enjoyable?
              </div>
              <TextField
                id="outlined-multiline-flexible"
                label="Response"
                multiline
                fullWidth
                rows="6"
                rowsMax="20"
                onChange={this.props.saveText("D5")}
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </div>
            <Button variant="contained" color="primary" className={classes.button} onClick={this.submit}>
              Submit
            </Button>
            <br />
          </div> :
          <div>
          <h2>Thank you for taking the time to play our game!</h2>
          <h2> Your input is extremely valuable for us as we continue testing and development.</h2>
          <h3>Copy your unique reward code and paste it on your Amazon Mechanical Turk HIT page</h3>
          <h3>Your Unique Code: {this.props.ID}</h3></div>}
      </div>
    );
  }
}

export default withStyles(styles)(End);
