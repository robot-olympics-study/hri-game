import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  body: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 70,
    paddingRight: 70,
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = event => {
    setAge(event.target.value);
    props.onChange(event);
  };

  return (
    <div>
        <br />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Box width="85%">
            <Typography id="discrete-slider-restrict" gutterBottom className={classes.body}>
              {props.question}
            </Typography>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">{props.name}</InputLabel>
              <Select
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
              >
                {props.data.map((item, i) =>
                  <MenuItem value={item} key={i}>{item} </MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
        </Grid>
    </div>
  );
}