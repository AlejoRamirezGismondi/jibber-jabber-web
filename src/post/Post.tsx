import React from 'react';
import {
  CardActions,
  CardContent,
  createStyles, IconButton,
  makeStyles,
  Theme,
  Typography
} from "@material-ui/core";
import PostCard from "./PostCard";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    postText: {
      textAlign: 'justify',
    },
  }),
);

const Post = () => {
  const classes = useStyles();
  const date: string = '5/15/2021, 12:23:43 AM';
  const userName: string = 'User Name';

  return (
    <PostCard date={date} userName={userName}>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.postText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon/>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon/>
        </IconButton>
        <IconButton aria-label="comment">
          <ChatBubbleIcon/>
        </IconButton>
      </CardActions>
    </PostCard>
  );
}

export default Post;
