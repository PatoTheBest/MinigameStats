import SideBar from "../components/SideBar.js";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Leaderboard from "./leaderboard";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3),
    marginLeft: 220,
    marginTop: 60,
    display: "flex",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.content}>
        <SideBar />
        <Switch>
          <Route path="/leaderboards/:game/" component={Leaderboard} />
          <Route path="/search/" render={() => <h1>¡Pronto!</h1>} />
          <Route path="/" render={() => <h1>¡Bienvenido!</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
