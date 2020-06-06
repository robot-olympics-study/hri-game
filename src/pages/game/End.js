import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { MAX_ROOMS } from '../config.js';

import MuiSlider from './inputs/MuiSlider.js'

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
              What do you think of Denise as a teammate? (honest opinions here - we won't tell Denise!)
              <br/>
              Would you have preferred to work with a different version of Denise?
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
              How did your thoughts about Denise change throughout the game?
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
            <div className={classes.textBox}>
              <div className={classes.textBoxHeader}>
              Do you feel that Denise chose rooms with a consistent strategy throughout the game?
              </div>
              <TextField
                id="outlined-multiline-flexible"
                label="Response"
                multiline
                fullWidth
                rows="6"
                rowsMax="20"
                onChange={this.props.saveText("D3")}
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </div>
            <br />
            <div className={classes.textBox}>
              <div className={classes.textBoxHeader}>
              Do you feel that you and Denise would score more points if you tried again?
              </div>
              <TextField
                id="outlined-multiline-flexible"
                label="Response"
                multiline
                fullWidth
                rows="6"
                rowsMax="20"
                onChange={this.props.saveText("D4")}
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </div>
            <MuiSlider 
              question="Denise is able to understand audio instructions."
              onChange={this.props.saveSlider("A1")}/>
            <MuiSlider 
              question="Denise is able to recognize colors."
              onChange={this.props.saveSlider("A2")}/>
            <MuiSlider 
              question="Denise is able to recognize faces."
              onChange={this.props.saveSlider("A3")}/>
            <MuiSlider 
              question="Denise is able to recognize objects."
              onChange={this.props.saveSlider("A4")}/>
            <MuiSlider 
              question="Denise is able to locate the origin of a noise."
              onChange={this.props.saveSlider("A5")}/>
            <MuiSlider 
              question="Denise is able to navigate in the dark."
              onChange={this.props.saveSlider("A6")}/>
            <br />
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
          <h2> Your input is extremely valuable for us as we continue testing and development.</h2></div>}
      </div>
    );
  }
}

export default withStyles(styles)(End);
