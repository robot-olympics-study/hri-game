import React from 'react';

import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

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

class Notes extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className="Notes">
        <h1> Your notes</h1>
        <Divider />
        <br />
        <div className={classes.textBox}>
          <div className={classes.textBoxHeader}>
            Feel free to take any notes here. Your notes will automatically save and persist throughout the game.
            </div>
            
          <TextField
            id="outlined-multiline-flexible"
            label="Response"
            multiline
            fullWidth
            rows="6"
            rowsMax="20"
            onChange={() => this.props.saveText('Notes')}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </div>

      </div>

    );
  }
}

export default withStyles(styles)(Notes);
