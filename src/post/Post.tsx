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

const Post = (props) => {
  const classes = useStyles();

  return (
    <PostCard date={props.date} userName={props.userName}>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.postText}>
          {props.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon/>
        </IconButton>
      </CardActions>
    </PostCard>
  );
}

export default Post;
