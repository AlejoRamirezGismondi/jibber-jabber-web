import React from 'react'
import {Avatar, Card, CardHeader, createStyles, makeStyles, Theme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import Header from "../header/Header";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '5%',
    },
    avatar: {
      backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
    },
    div: {
      display: 'flexbox'
    },
    searchBar: {
      width: '90%',
    }
  }));

const ChatFeed = (props) => {
  const classes = useStyles();

  return(
    <div>
      <Header/>
      {props.chats.map(() => {
        return(
          <Grid item key={1} xs={12} sm={6} md={4}>
            <Card className={classes.root}>
              <Link to={'/chat/userid'}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {/*{user.firstName.charAt(0)}*/}
                    </Avatar>
                  }
                  // title={user.firstName}
                  // subheader={user.email}
                />
              </Link>
            </Card>
          </Grid>
        );
      })}
    </div>
  );
}

export default ChatFeed;
