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
  userName: string
}

const Home = () => {
  const classes = useStyles();

  const [cards, setCards] = useState<GettedPost[]>([]);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    axios.get(postUrl+`post`)
      .then(res => {
        setCards(res.data)
      });

    let token = getToken();

    axios.get(userUrl + 'user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setUser(response.data);
      })
  }, [])

  if (!user || !cards) return(<div>
    <Header/>
  </div>)

  return (
    <div>
      <Header/>
      <NewPost className={classes.newPost} username={user.firstName}/>
      <Feed cards={[{id: "0", text: "text", date: "date", userName: "username"}]}/>
    </div>
  );
}

export default Home;
