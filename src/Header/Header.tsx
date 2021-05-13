import React from 'react';
import {Button, makeStyles, Toolbar, Typography, IconButton} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  return(
    <Toolbar className={classes.toolbar}>
      <Button size="small">Home</Button>
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
      <IconButton>
        <SearchIcon />
      </IconButton>
      <Button variant="outlined" size="small">
        Sign up
      </Button>
    </Toolbar>
  );
}

export default Header;
