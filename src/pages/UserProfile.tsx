import React, {useEffect, useState} from 'react';
import Header from "../header/Header";
import {useParams} from "react-router";
import axios from "axios";
import {postUrl, userUrl} from "../utils/http";
import Feed from "../feed/Feed";
import {Button, Card, CardActions, CardContent, makeStyles, Typography} from "@material-ui/core";

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
  const [user, setUser] = useState({firstName: 'juan', lastName: 'dsa', email: 'asdasd'});
  const [posts, setPosts] = useState();

  useEffect(() => {
    axios.get(userUrl + 'user/' + id)
      .then(response => {
        setUser(response.data);
      });

    axios.get(postUrl + 'user/' + id)
      .then(response => {
        setPosts(response.data);
      });
  });

  if (user && posts) return (
    <>
      <Header/>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {user.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Follow</Button>
        </CardActions>
      </Card>
      <Feed cards={posts}/>
    </>
  );

  return (
    <>
      <Header/>
      <h2> Loading... </h2>
    </>);
}

export default UserProfile;
