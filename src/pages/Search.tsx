import React, {useState} from 'react';
import Header from "../header/Header";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import {userUrl} from "../utils/http";
import Grid from "@material-ui/core/Grid";
import {Avatar, Button, Card, CardHeader, createStyles, makeStyles, Theme} from "@material-ui/core";
import {Link} from "react-router-dom";
import {getToken} from "../utils/token";

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
  }))

const Search = () => {
  const classes = useStyles();
  const [input, setInput] = useState<string>('');
  const [user, setUser] = useState(undefined);

  function handleSubmit(event) {
    event.preventDefault();

    let token = getToken();

    axios.post(userUrl + 'user/getUserByUserName', input,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "text/plain"
        },
      })
      .then(response => {
        setUser(response.data);
      });
  }

  return (
    <>
      <Header/>
      <form onSubmit={handleSubmit}>
        <div className={classes.div}>
          <TextField
            className={classes.searchBar}
            variant="outlined"
            margin="normal"
            name="search"
            label="search"
            id="search"
            placeholder={'Search for users'}
            onChange={(e) => {
              setInput(e.target.value)
            }}
          />
          <Button type={"submit"}>
            Search
          </Button>
        </div>
      </form>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          { user ?
            <Grid item key={user.id} xs={12} sm={6} md={4}>
              <Card className={classes.root}>
                <Link to={'/user/' + user.id}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {user.firstName.charAt(0)}
                      </Avatar>
                    }
                    title={user.firstName}
                    subheader={user.email}
                  />
                </Link>
              </Card>
            </Grid>
            :
            <></>
          }
        </Grid>
      </Grid>
    </>
  );
}

export default Search;
