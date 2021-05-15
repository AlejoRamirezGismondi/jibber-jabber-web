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
    }
  }),
);

const NewPost = () => {
  const classes = useStyles();

  return (
    <form>
      <PostCard>
        <CardContent>
          <TextField
            multiline
            rows={4}
            variant="outlined"
            className={classes.textField}
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
