import React, {useEffect, useState} from 'react'
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {GettedPost} from "./Home";
import axios from "axios";
import {postUrl} from "../utils/http";
import {getToken} from "../utils/token";
import Header from "../header/Header";
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

  useEffect(() => {

    let token = getToken();

    axios.get(postUrl+`post/myPosts`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => {
        setCards(res.data.map(card => {
          return {id: card.id, text: card.body, date: '5/15/2021, 12:23:43 AM', userName: 'User Name'}
        }))
      });
  }, []);

  if (!cards) return(<div>
    <Header/>
    <h1>Loading...</h1>
  </div>);

  return (
    <div>
      <Header/>
      <Feed own={true} cards={cards}/>
    </div>
  );
}

export default MyPosts;
