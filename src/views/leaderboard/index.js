import React, { Component } from "react";
import axios from "axios";
import stats from "./stats.json";
import LeaderboardTable from "../../components/LeaderboardTable.js";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
});

class Leaderboard extends Component {
  render() {
    const { classes } = this.props;

    if (stats[this.props.match.params.game] === undefined) {
      return <div>404</div>;
    }

    if (this.state === null || this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className={classes.root}>
        {Object.keys(this.state.stats).map((stat, index) => {
          return (
            <LeaderboardTable
              players={this.state.stats[stat].players}
              title={this.state.stats[stat].translation}
            />
          );
        })}
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps === undefined) {
      return;
    }

    if (this.props.match.params.game !== prevProps.match.params.game) {
      this.setState({
        loading: true,
      });
      this.loadData();
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const newState = {
      loading: false,
      stats: [],
    };

    stats[this.props.match.params.game].forEach((stat) => {
      const { name } = stat;
      newState.stats[name] = {
        ...stat,
        players: [],
      };
    });

    this.setState(newState);
    Object.keys(newState.stats).forEach((stat) => {
      this.loadStat(newState.stats[stat]);
    });
  }

  async loadStat(stat) {
    let response = await axios.get(
      "/api/leaderboard/all/" +
        this.props.match.params.game +
        "/" +
        stat.name +
        "/"
    );
    this.setState((state) => {
      const newState = state;
      state.stats[stat.name].players = response.data;
      return newState;
    });
  }
}

export default withStyles(useStyles)(Leaderboard);
