import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
  body: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 70,
    paddingRight: 70,
  },
});

class MultipleChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.onChange(event);
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Box width="85%">
          <Typography gutterBottom className={classes.body}>
            {this.props.question}
          </Typography>
          <FormControl component="fieldset" >
            <FormLabel component="legend"></FormLabel>
            <RadioGroup value={this.state.value} onChange={this.handleChange}>
              {this.props.choices.map((choice, i) =>
                <FormControlLabel value={choice} control={<Radio />} label={choice} key={i} />)}
            </RadioGroup>
          </FormControl>
        </Box>
      </Grid>

    );
  }
}

export default withStyles(styles)(MultipleChoice);