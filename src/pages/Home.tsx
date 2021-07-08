import React, {useEffect, useState} from 'react';
import Header from "../header/Header";
import NewPost from "../post/NewPost";
import Feed from "../feed/Feed";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import axios from "axios";
import {postUrl, userUrl} from "../utils/http";
import {User} from "../models/User";
import {getToken} from "../utils/token";

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
  userName: string,
  likes: number,
  liked: boolean
}

const Home = () => {
  const classes = useStyles();

  const [cards, setCards] = useState<GettedPost[]>([]);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    let token = getToken();

    axios.get(postUrl+`post/following`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setCards(res.data.map(card => {
          return {id: card.id, text: card.body, date: card.date, userName: card.username, liked: card.likedByUser, likes: card.likes}
        }))
      });

    axios.get(userUrl + 'user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setUser(response.data);
      })
  }, [])

  const postDeleted = deletedId => {
    setCards(cards.filter(card => card.id !== deletedId));
  }

  if (!user || !cards) return(<div>
    <Header/>
    <h1>Loading...</h1>
  </div>)

  return (
    <div>
      <Header/>
      <NewPost className={classes.newPost} username={user.firstName}/>
      <Feed onDelete={deletedId => {postDeleted(deletedId)}} own={false} cards={cards}/>
    </div>
  );
}

export default Home;
