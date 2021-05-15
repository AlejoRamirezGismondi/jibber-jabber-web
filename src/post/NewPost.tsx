import React from 'react';
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
  const userName: string = 'User Name';

  return (
    <form className={props.className}>
      <PostCard className={classes.postCard} date={date.toLocaleString()} userName={userName}>
        <CardContent>
          <TextField
            multiline
            rows={maxRows}
            variant="outlined"
            className={classes.textField}
            inputProps={{ maxLength: maxLength }}
          />
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="post" className={classes.sendButton}>
            <SendIcon/>
          </IconButton>
        </CardActions>
      </PostCard>
    </form>
  );
}

export default NewPost;
