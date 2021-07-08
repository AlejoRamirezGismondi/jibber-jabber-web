import React from 'react';
import {Button, makeStyles, Toolbar, Typography, IconButton, Theme} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import {expireToken, getToken} from "../utils/token";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: "flex",
    justifyContent: "space-between",
  },
  toolbarTitle: {},
  button: {
    marginLeft: "5px"
  },
  homeButton: {},
  rightButtons: {}
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();

  const logout = () => {
    expireToken();
    history.push('/login');
  }

  return (
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
        Jibber Jabber CAMBIADO
      </Typography>
      <div className={classes.rightButtons}>
        <IconButton href={'/search'}>
          <SearchIcon/>
        </IconButton>
        {getToken() ?
          <>
          <Button variant="outlined" size="small" className={classes.button} href={"/profile"}>
            My Profile
          </Button>
            <Button variant="outlined" size="small" className={classes.button} href={"/my-posts"}>
              My Posts
            </Button>
            <Button variant="outlined" size="small" className={classes.button} href={"/chats"}>
              Chats
            </Button>
          <Button variant="outlined" size="small" className={classes.button} onClick={logout}>
            Logout
          </Button>
          </>
          :
          <Button variant="outlined" size="small" className={classes.button} href={"/login"}>
            Log In
          </Button>
        }
      </div>
    </Toolbar>
  );
}

export default Header;
