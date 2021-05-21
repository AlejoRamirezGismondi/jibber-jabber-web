import React, {useEffect, useState} from 'react';
import Header from "../header/Header";
import NewPost from "../post/NewPost";
import Feed from "../feed/Feed";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import axios from "axios";
import {postUrl} from "../utils/http";

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

export interface GettedPost {
  id: string,
  text: string,
  date: string,
  userName: string
}

const Home = () => {
  const classes = useStyles();

  const [cards, setCards] = useState<[GettedPost]>();

  useEffect(() => {
    axios.get(postUrl+`posts`)
      .then(res => {
        setCards(res.data)
      })
  })

  return (
    <div>
      <Header/>
      <NewPost className={classes.newPost}/>
      <Feed cards={[{id: "0", text: "text", date: "date", userName: "username"}]}/>
    </div>
  );
}

export default Home;
