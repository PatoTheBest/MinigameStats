import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Avatar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const columns = [
  {
    id: "pos",
    label: "Posición",
    minWidth: 40,
  },
  {
    id: "name",
    label: "Nombre",
    minWidth: 200,
  },
  {
    id: "stat",
    label: "Cantidad",
    minWidth: 100,
  },
];

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: "1 1 100%",
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    //width: '100%',
  },
  container: {
    maxHeight: 580,
  },
  namecell: {
    display: "flex",
  },
  loading: {},
  avatar: {
    paddingRight: theme.spacing(2),
  },
}));

const LeaderboardTable = (props) => {
  const toolbarClasses = useToolbarStyles();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <Toolbar className={toolbarClasses.root}>
        <Typography
          className={toolbarClasses.title}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          {props.title}
        </Typography>
      </Toolbar>
      <TableContainer className={classes.container}>
        <Table
          stickyHeader
          aria-label="sticky table"
          size="small" // dense table
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.players.length !== 0 ? (
              props.players
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const { name, stat } = row;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell key="pos" align="center">
                        {index + page * rowsPerPage + 1}
                      </TableCell>

                      <TableCell key="name" className={classes.namecell}>
                        <Avatar
                          variant="square"
                          src={
                            "https://www.mc-heads.net/avatar/" + name + "/100"
                          }
                          className={classes.avatar}
                        />
                        {name}
                      </TableCell>

                      <TableCell key="stat">{stat}</TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <TableRow tabIndex={-1} style={{ height: 530 }}>
                <TableCell key="pos" align="center"></TableCell>

                <TableCell
                  key="name"
                  className={classes.loading}
                  align="center"
                >
                  <CircularProgress />
                  <Typography variant="caption" display="block">
                    Cargando...
                  </Typography>
                </TableCell>

                <TableCell key="stat"></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.players.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default LeaderboardTable;
