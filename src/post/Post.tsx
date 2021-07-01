import React, {useState} from 'react';
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
import axios from "axios";
import {Delete} from "@material-ui/icons";
import {postUrl} from "../utils/http";
import {getToken} from "../utils/token";

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

type Props = {
  id: string
  date: string
  userName: string
  own: boolean
  text: string
  onDelete: (id: string) => void
}

const Post = (props: Props) => {
  const classes = useStyles();
  const [liked, setLiked] = useState(false);

  const favClicked = () => {
    let token = getToken();

    if (!liked) {
      axios.put(postUrl + 'post/like/' + props.id, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then(() => {})
    } else {
      axios.put(postUrl + 'post/unlike/' + props.id, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then(() => {})
    }
    setLiked(!liked);
  }

  const deleteClicked = () => {
    let token = getToken();

    axios.delete(postUrl + 'post/' + props.id, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then(() => {
      props.onDelete(props.id);
    })
  }

  return (
    <PostCard date={props.date} userName={props.userName}>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.postText}>
          {props.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton color={liked ? 'primary' : 'default'} aria-label="add to favorites" onClick={favClicked}>
          <FavoriteIcon/>
        </IconButton>
        {props.own ?
          <IconButton aria-label="delete" onClick={deleteClicked}>
            <Delete/>
          </IconButton>
        :
        <></>
        }
      </CardActions>
    </PostCard>
  );
}

export default Post;
