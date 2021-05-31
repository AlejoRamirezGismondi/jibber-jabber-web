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
      <Button href={"/"} size="small" className={classes.homeButton}>Home</Button>
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
          <SearchIcon href={'/search'} />
        </IconButton>
        <Button variant="outlined" size="small" className={classes.button} href={"/profile"}>
          My Profile
        </Button>
      </div>
    </Toolbar>
  );
}

export default Header;
