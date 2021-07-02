import React, {useState} from 'react';
import {
  CardActions,
  CardContent,
  createStyles, IconButton,
  makeStyles, TextField,
  Theme
} from "@material-ui/core";
import {red} from "@material-ui/core/colors";
import SendIcon from '@material-ui/icons/Send';
import PostCard from "./PostCard";
import axios from "axios";
import {postUrl} from "../utils/http";
import {getToken} from "../utils/token";

const maxRows: number = 4;
const maxLength: number = 180;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    avatar: {
      backgroundColor: red[500],
    },
    postText: {
      textAlign: 'justify',
    },
    sendButton: {
      marginLeft: "auto",
    },
    textField: {
      minWidth: "100%",
    },
    postCard: {
      width: '100%',
    }
  }),
);

const NewPost = (props) => {
  const classes = useStyles();
  const date: Date = new Date();
  const userName: string = props.username;

  const [text, setText] = useState("");

  function createNewPost() {
    let token = getToken();

    axios.post(postUrl+`post`, { body:text, date: new Date().toLocaleDateString() + ", " + new Date().toLocaleTimeString() }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setText("");
      })
  }

  return (
    <div className={props.className}>
      <PostCard className={classes.postCard} date={date.toLocaleString()} userName={userName}>
        <CardContent>
          <TextField
            multiline
            rows={maxRows}
            variant="outlined"
            className={classes.textField}
            inputProps={{ maxLength: maxLength }}
            value={text}
            onChange={(t) => {setText(t.target.value)}}
          />
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="post" className={classes.sendButton} onClick={() => {createNewPost()}}>
            <SendIcon/>
          </IconButton>
        </CardActions>
      </PostCard>
    </div>
  );
}

export default NewPost;
