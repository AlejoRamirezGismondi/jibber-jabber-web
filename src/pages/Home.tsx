import React from 'react';
import Header from "../header/Header";
import NewPost from "../post/NewPost";
import Feed from "../feed/Feed";
import {createStyles, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    newPost: {
      display: 'flex',
      marginTop: '2%',
      justifyContent: 'center',
    }
  }),
);

const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <Header/>
      <NewPost className={classes.newPost}/>
      <Feed/>
    </div>
  );
}

export default Home;
