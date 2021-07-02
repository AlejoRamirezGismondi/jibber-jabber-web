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

  const postDeleted = deletedId => {
    setCards(cards.filter(card => card.id !== deletedId));
  }

  useEffect(() => {

    let token = getToken();

    axios.get(postUrl+`post/myPosts`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => {
        setCards(res.data.map(card => {
          return {id: card.id, text: card.body, date: card.date, userName: card.firstName, liked: card.likedByUser, likes: card.likes}
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
      <Feed onDelete={deletedId => postDeleted(deletedId)} own={true} cards={cards}/>
    </div>
  );
}

export default MyPosts;
