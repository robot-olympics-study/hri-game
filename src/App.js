import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import Game from './pages/game/Game.js';

class App extends React.Component {
  render() {
    return (
      <div className="App" style={{ backgroundColor: "#F6F6F6", paddingBottom: 20 }} >
        <AppBar position="static" >
          <Toolbar style={{fontSize: "19px"}}>Robot Olympics</Toolbar>
        </AppBar>
        <br />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Box width="75%" maxWidth={1000}>
            <Game />
          </Box>
        </Grid>
      </div>
    );
  }
}

export default App;
