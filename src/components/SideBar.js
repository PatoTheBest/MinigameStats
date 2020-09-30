import React from "react";
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import ListIcon from "@material-ui/icons/List";
import MapIcon from "@material-ui/icons/Map";
import BusinessIcon from "@material-ui/icons/Business";
import FastfoodIcon from "@material-ui/icons/Fastfood";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: `${drawerWidth}`,
  },
}));

const SideBar = (props) => {
  const { history } = props;
  const classes = useStyles();
  const itemsList = [
    {
      text: "Buscar un Jugador",
      icon: <ListIcon />,
      onClick: () => history.push("/search"),
    },
    {
      text: "SkyWars",
      icon: <MapIcon />,
      onClick: () => history.push("/leaderboards/skywars"),
    },
    {
      text: "TheTowers",
      icon: <BusinessIcon />,
      onClick: () => history.push("/leaderboards/thetowers"),
    },
    {
      text: "HungerGames",
      icon: <FastfoodIcon />,
      onClick: () => history.push("/leaderboards/hungergames"),
    },
  ];
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Estadísticas
          </Typography>
        </Toolbar>
      </AppBar>
      <MUIDrawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <List>
          {itemsList.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem button key={text} onClick={onClick}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
      </MUIDrawer>
    </div>
  );
};

export default withRouter(SideBar);
