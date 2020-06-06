import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';
import { animateScroll as scroll } from "react-scroll";

import { rewards, successes, robot_strategy, MAX_ROOMS, roomOrder, TREATMENT, STRATEGY, greedy_choice } from '../config.js'
import Intro from './Intro.js';
import RoomOptions from './RoomOptions.js';
import HumanVideo from './HumanVideo.js';
import RobotVideo from './RobotVideo.js';
import End from './End.js';
import History from './History.js';
import Notes from './Notes.js';

const cookies = new Cookies();
const baseURL = "https://robot-olympics-study-trial-1.herokuapp.com"
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
  paper: {
    padding: theme.spacing(3, 2),
  },

});

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      valid: true,
      history: [],
      stage: 0,
      score: 0,
      page: 'intro',
      roundScore: 0,
      showHistory: false,
      showNotes: false,
      complete: false,
      loaded: false,
      Notes: '',
    }
  }

  // Send data to backend server to push to excel spreadsheet
  _sendData = (route) => {
    var today = new Date();
    fetch(baseURL + route, {
      method: 'POST',
      headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        Name: this.state.name || "no name",
        ID: this.state.id || "no id",
        FirstTime: this.state.valid,
        Date: (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
        History: this.state.history.join("_") || "no history",
        TotalScore: this.state.score || "no total score",
        H0: this.state.H0 || "",
        H1: this.state.H1 || "",
        H2: this.state.H2 || "",
        H3: this.state.H3 || "",
        H4: this.state.H4 || "",
        R0: this.state.R0 || "",
        R1: this.state.R1 || "",
        R2: this.state.R2 || "",
        R3: this.state.R3 || "",
        R4: this.state.R4 || "",
        D1: this.state.D1 || "",
        D2: this.state.D2 || "",
        D3: this.state.D3 || "",
        D4: this.state.D4 || "",
        D5: this.state.D5 || "",
        A1: this.state.A1 || 4,
        A2: this.state.A2 || 4,
        A3: this.state.A3 || 4,
        A4: this.state.A4 || 4,
        A5: this.state.A5 || 4,
        A6: this.state.A6 || 4,
        Q1: this.state.Q1 || "",
        Q2: this.state.Q2 || "",
        Q3: this.state.Q3 || 3,
        Q4: this.state.Q4 || 3,
        Q5: this.state.Q5 || 3,
        Q6: this.state.Q6 || "",
        Notes: this.state.Notes || "",
        Treatment: TREATMENT,
        Strategy: STRATEGY,
        SiteVersion: 2.12,
        Loaded: this.state.loaded,
      }),
    })
    console.log("Data pushed");
    if (route === "/complete") {
      this.setState({ complete: true, showHistory: false })
    }
  }

  // Add human/robot moves to history
  _updateHistory = (move) => {
    this.setState(state => {
      const history = state.history.concat(move);
      return { history }
    })
  }

  _updateScore = (chosenRoom, type) => {
    const row = roomOrder[this.state.stage];
    const success = successes[row][chosenRoom]
    const newPoints = success ? rewards[row][chosenRoom] : 0
    console.log("Gained " + newPoints + " pts");
    this.setState(state => {
      return { score: state.score + newPoints }
    })
    if (type === "human") {
      this.setState({ roundScore: newPoints })
    } else {
      this.setState(state => {
        return { roundScore: state.roundScore + newPoints }
      })
    }
  }

  _updatePage = (newPage, cb) => {
    this.setState({
      page: newPage
    }, cb);
    this._sendData("/raw");
  }

  // Intro screen --> Human room options
  beginGame = () => {
    const id = Math.floor(Math.random() * 2 ** 16);
    this.setState({ id: id }, this.setCookies);
    this._updatePage("chooseRoom");
    this.setState({ showNotes: true });
  }

  saveText = name => event => {
    this.setState({ [name]: event.target.value });
  };

  saveSlider = name => (event, newValue) => {
    this.setState({ [name]: newValue });
  };

  demographicsDone = () => {
    return this.state.Q1 != null && this.state.Q2 != null;
  }

  validData = () => {
    this.setState(state => {
      const validData = !state.valid
      return { valid: validData }
    });
  }

  scrollTop = () => {
    scroll.scrollToTop({
      duration: 750,
      smooth: true,
    });
  }

  // Human chooses room --> Human action video
  chooseRoom = (room) => {
    this._updateScore(room, "human");
    this._updateHistory(room);
    this._updatePage("humanVideo");
    this.scrollTop();
  }

  // Human action video --> Robot action video
  getRobotAction = () => {
    // Index into the cached mcts results to get robot action
    // const strategy = this.state.id ? this.state.id % robot_strategies.length : 0;
    // const robotAction = robot_strategies[strategy][this.state.history.join('')];
    if(STRATEGY=="GREEDY"){
      const row = roomOrder[this.state.stage];
      const robotAction = greedy_choice[row];
      this._updateScore(robotAction, "robot");
      this._updateHistory(robotAction);
      this._updatePage("robotVideo");
      this.scrollTop();
    }
    else{
      const robotAction = robot_strategy[this.state.history.join('')];
      this._updateScore(robotAction, "robot");
      this._updateHistory(robotAction);
      this._updatePage("robotVideo");
      this.scrollTop();
    }
  }

  // Stages go from 0 to 4, 5 indicates a finished game.
  incrementStage = () => {
    this.setState(state => {
      return { stage: state.stage + 1, roundScore: 0 }
    }, () => {
      if (this.state.stage < MAX_ROOMS) {
        this._updatePage("chooseRoom", this.setCookies);
      } else {
        this._updatePage("end", this.setCookies)
      }
    });
    this.scrollTop();
  }

  setCookies = () => {
    let d = new Date();
    d.setTime(d.getTime() + (72 * 60 * 60 * 1000)); // 3 days in the future
    cookies.set("started", true, { path: "/", expires: d });
    cookies.set("name", this.state.name, { path: "/", expires: d });
    cookies.set("id", this.state.id, { path: "/", expires: d });
    cookies.set("history", this.state.history.join("_"), { path: "/", expires: d });
    cookies.set("score", this.state.score, { path: "/", expires: d });
    cookies.set("stage", this.state.stage, { path: "/", expires: d });
    cookies.set("valid", this.state.valid, { path: "/", expires: d });
    cookies.set("treatment", TREATMENT, { path: "/", expires: d });
    cookies.set("Q1", this.state.Q1 || "", { path: "/", expires: d });
    cookies.set("Q2", this.state.Q2 || "", { path: "/", expires: d });
    cookies.set("Q3", this.state.Q3 || 3, { path: "/", expires: d });
    cookies.set("Q4", this.state.Q4 || 3, { path: "/", expires: d });
    cookies.set("Q5", this.state.Q5 || 3, { path: "/", expires: d });
    cookies.set("Q6", this.state.Q6 || "", { path: "/", expires: d });
    this.setState({ showHistory: false }, () => this.setState({ showHistory: true }));
  };

  clearCookies = () => {
    cookies.remove("started", { path: '/' });
    cookies.remove("name", { path: '/' });
    cookies.remove("id", { path: '/' });
    cookies.remove("history", { path: '/' });
    cookies.remove("score", { path: '/' });
    cookies.remove("stage", { path: '/' });
    cookies.remove("valid", { path: '/' });
    cookies.remove("treatment", { path: '/' });
    cookies.remove("Q1", { path: '/' });
    cookies.remove("Q2", { path: '/' });
    cookies.remove("Q3", { path: '/' });
    cookies.remove("Q4", { path: '/' });
    cookies.remove("Q5", { path: '/' });
    cookies.remove("Q6", { path: '/' });
  };

  loadCookies = () => {
    const hist = cookies.get("history") === "" ? [] : cookies.get("history").split("_").map(Number);
    if (cookies.get("treatment") !== TREATMENT) {
      console.log("Error: Different treatment. Please contact an administrator.")
      return;
    }
    this.setState({
      name: cookies.get("name"),
      id: parseInt(cookies.get("id")),
      history: hist,
      score: parseFloat(cookies.get("score")),
      stage: parseInt(cookies.get("stage")),
      valid: cookies.get("valid") === "true",
      loaded: true,
      Q1: cookies.get("Q1"),
      Q2: cookies.get("Q2"),
      Q3: cookies.get("Q3"),
      Q4: cookies.get("Q4"),
      Q5: cookies.get("Q5"),
      Q6: cookies.get("Q5"),
    }, () => {
      if (this.state.stage === MAX_ROOMS) {
        this.setState({ page: 'end' });
      } else {
        this.setState({ page: 'chooseRoom' });
      }
    });
  }

  toggleNotes = () => {
    this.setState(state => {
      return { showNotes: !state.showNotes }
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="game" >
        <Paper className={classes.paper}>
          {this.state.page === "intro" ?
            <Intro
              nextPage={this.beginGame}
              setName={this.saveText}
              validData={this.validData}
              name={this.state.name}
              checkCookies={this.checkCookies}
              cookies={cookies}
              clearCookies={this.clearCookies}
              loadCookies={this.loadCookies}
              saveSlider={this.saveSlider}
              saveDropdown={this.saveText}
              saveRadio={this.saveText}
              demographicsDone={this.demographicsDone} /> : ""}
          {this.state.page === "chooseRoom" ?
            <RoomOptions
              stage={this.state.stage}
              nextPage={this.chooseRoom}
              score={this.state.score} /> : ""}
          {this.state.page === "humanVideo" ?
            <HumanVideo
              stage={this.state.stage}
              action={this.state.history[this.state.history.length - 1]}
              score={this.state.roundScore}
              roundScore={this.state.roundScore}
              nextPage={this.getRobotAction}
              saveText={this.saveText}
              valid={this.state.valid}
              scrollTop={this.scrollTop} /> : ""}
          {this.state.page === "robotVideo" ?
            <RobotVideo
              stage={this.state.stage}
              action={this.state.history[this.state.history.length - 1]}
              score={this.state.roundScore}
              roundScore={this.state.roundScore}
              nextPage={this.incrementStage}
              saveText={this.saveText}
              valid={this.state.valid}
              scrollTop={this.scrollTop} /> : ""}
          {this.state.page === "end" ?
            <End
              totalScore={this.state.score}
              saveText={this.saveText}
              sendData={() => this._sendData("/complete")}
              saveSlider={this.saveSlider}
              clearCookies={this.clearCookies} /> : ""}
        </Paper>
        <br />
        {(this.state.page === "chooseRoom" && this.state.history.length > 0) || (this.state.page === "end" && !this.state.complete) ?
          <Button variant="contained" color="primary" className={classes.button} onClick={() => this.setState(state => { return { showHistory: !state.showHistory } })}>
            Show history
          </Button> : ""}
        <br />
        <br />
        {this.state.showHistory ?
          <div className="history" >
            <Paper className={classes.paper}>
              <History
                history={this.state.history}
                stage={this.state.stage} />
            </Paper>
            <br />
            <br />
          </div > : ""}
        {this.state.page !== 'intro' && !this.state.complete ?
          <div className="toggleNotes">
            <Button variant="contained" color="primary" className={classes.button} onClick={this.toggleNotes}>
              Show/Hide Notes
          </Button>
            <br />
            <br />
          </div> : ''}
        {this.state.showNotes && !this.state.complete ?
          <Paper className={classes.paper}>
            <Notes saveText={this.saveText} />
          </Paper> : ""}
      </div>

    );
  }
}

export default withStyles(styles)(Game);
