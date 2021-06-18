import React, {useEffect, useState} from 'react'
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {GettedPost} from "./Home";
import axios from "axios";
import {postUrl, userUrl} from "../utils/http";
import {getToken} from "../utils/token";
import Header from "../header/Header";
import NewPost from "../post/NewPost";
import Feed from "../feed/Feed";

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

const MyPosts = () => {
  const classes = useStyles();

  const [cards, setCards] = useState<GettedPost[]>([]);
  const username = 'pepe'

  useEffect(() => {

    let token = getToken();

    axios.get(postUrl+`post/myPosts`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => {
        setCards(res.data)
      });
  }, []);

  if (!cards) return(<div>
    <Header/>
    <h1>Loading...</h1>
  </div>);

  return (
    <div>
      <Header/>
      <Feed own={true} cards={[{id: "0", text: "text", date: "date", userName: "username"}]}/>
    </div>
  );
}

export default MyPosts;
