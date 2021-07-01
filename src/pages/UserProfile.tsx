import React, {useEffect, useState} from 'react';
import Header from "../header/Header";
import {useParams} from "react-router";
import axios from "axios";
import {postUrl, userUrl} from "../utils/http";
import Feed from "../feed/Feed";
import {Button, Card, CardActions, CardContent, makeStyles, Typography} from "@material-ui/core";
import {getToken} from "../utils/token";
import {User} from "../models/User";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const UserProfile = () => {
  const classes = useStyles();
  const {id} = useParams();
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState(false);
  let token = getToken();

  useEffect(() => {

    axios.get(userUrl + 'user/' + id, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setUser(response.data);
      });

    axios.get(postUrl + 'post/author/' + id, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setPosts(res.data.map(card => {
          return {id: card.id, text: card.body, date: '5/15/2021, 12:23:43 AM', userName: 'User Name'}
        }))
      });
  }, [token, id]);

  const follow = () => {
    axios.post(userUrl + 'user/follow/' + id, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    setFollowing(true);
  }

  const unfollow = () => {
    axios.post(userUrl + 'user/unfollow/' + id, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    setFollowing(false);
  }

  const postDeleted = deletedId => {
    setPosts(posts.filter(card => card.id !== deletedId));
  }

  if (user && posts) return (
    <>
      <Header/>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            First Name: {user.firstName}
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Second Name: {user.lastName}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Email: {user.email}
          </Typography>
        </CardContent>
        <CardActions>
          {following ? <Button onClick={unfollow} size="small">Unfollow</Button> :
            <Button onClick={follow} size="small">Follow</Button>}
        </CardActions>
      </Card>
      <Feed onDelete={deletedId => postDeleted(deletedId)} own={false} cards={posts}/>
    </>
  );

  return (
    <>
      <Header/>
      <h2> Loading... </h2>
    </>);
}

export default UserProfile;
