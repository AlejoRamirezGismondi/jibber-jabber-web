import React from 'react';
import {Button, makeStyles, Toolbar, Typography, IconButton, Theme} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: "flex",
    justifyContent: "space-between",
  },
  toolbarTitle: {
  },
  button: {
    marginLeft: "5px"
  },
  homeButton: {
  },
  rightButtons: {
  }
}));

const Header = () => {
  const classes = useStyles();

  return(
    <Toolbar className={classes.toolbar}>
      <Button size="small" className={classes.homeButton}>Home</Button>
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="center"
        noWrap
        className={classes.toolbarTitle}
      >
        Jibber Jabber
      </Typography>
      <div className={classes.rightButtons}>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small" className={classes.button}>
          Sign up
        </Button>
        <Button variant="outlined" size="small" className={classes.button} color={"primary"}>
          New
        </Button>
      </div>
    </Toolbar>
  );
}

export default Header;
