import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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
}));

const marks = [
  {
    value: 1,
    label: 'Strongly disagree',
  },
  {
    value: 2,
    label: '',
  },
  {
    value: 3,
    label: '',
  },
  {
    value: 4,
    label: '',
  },
  {
    value: 5,
    label: '',
  },
  {
    value: 6,
    label: '',
  },
  {
    value: 7,
    label: 'Strongly agree',
  },
];

const marks5 = [
  {
    value: 1,
    label: 'Strongly disagree',
  },
  {
    value: 2,
    label: 'Slightly disagree',
  },
  {
    value: 3,
    label: 'Neutral',
  },
  {
    value: 4,
    label: 'Slightly agree',
  },
  {
    value: 5,
    label: 'Strongly agree',
  },
];

const marks7 = [
  {
    value: 1,
    label: 'Definitely cannot',
  },
  {
    value: 2,
    label: 'Probably cannot',
  },
  {
    value: 3,
    label: 'Maybe cannot',
  },
  {
    value: 4,
    label: 'Unsure',
  },
  {
    value: 5,
    label: 'Maybe can',
  },
  {
    value: 6,
    label: 'Probably can',
  },
  {
    value: 7,
    label: 'Definitely can',
  },
];

const marks8 = [
  {
    value: 1,
    label: 'Strongly disagree',
  },
  {
    value: 2,
    label: 'Disagree',
  },
  {
    value: 3,
    label: 'Slightly disagree',
  },
  {
    value: 4,
    label: 'Neutral',
  },
  {
    value: 5,
    label: 'Slightly agree',
  },
  {
    value: 6,
    label: 'Agree',
  },
  {
    value: 7,
    label: 'Strongly agree',
  },
];

function valuetext(value) {
  return `${value}`;
}

function valueLabelFormat(value) {
  return marks.findIndex(mark => mark.value === value) + 1;
}

function valueLabelFormat5(value) {
  return marks5.findIndex(mark => mark.value === value) + 1;
}

function valueLabelFormat7(value) {
  return marks7.findIndex(mark => mark.value === value) + 1;
}

export default function MuiSlider(props) {
  const classes = useStyles();
  if(props.marks === 7){
    return (
      <div>
        <br/>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Box width="75%">
            <Typography id="discrete-slider-restrict" gutterBottom className={classes.body}>
              {props.question}
            </Typography>
            <Slider
              defaultValue={props.marks === 7 ? 4: 3}
              valueLabelFormat={props.marks === 7 ? valueLabelFormat7 : valueLabelFormat}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-restrict"
              step={1}
              min={1}
              max={props.marks === 7 ? 7 : 5}
              valueLabelDisplay="auto"
              marks={props.marks === 7 ? marks7 : marks}
              onChange={props.onChange}
            />
          </Box>
        </Grid>
      </div>
    );
  }
  return (
    <div>
      <br/>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Box width="75%">
          <Typography id="discrete-slider-restrict" gutterBottom className={classes.body}>
            {props.question}
          </Typography>
          <Slider
          defaultValue={props.marks === 5 ? 3: 4}
          valueLabelFormat={props.marks === 5 ? valueLabelFormat5 : valueLabelFormat}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-restrict"
          step={1}
          min={1}
          max={props.marks === 5 ? 5 : 7}
          valueLabelDisplay="auto"
          marks={props.marks === 5 ? marks5 : marks}
          onChange={props.onChange}
          />
        </Box>
      </Grid>
    </div>
  );


}
