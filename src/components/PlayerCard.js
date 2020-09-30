import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Avatar, CardHeader } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const PlayerCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            src={
              "https://www.mc-heads.net/avatar/" +
              props.player.playerName +
              "/100"
            }
          />
        }
        title={props.player.playerName}
        subheader={"Top " + props.player.position}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.player.statAmount + " kills"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
