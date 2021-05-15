import React from 'react';
import {
  Avatar,
  Card,
  CardHeader,
  createStyles,
  IconButton, makeStyles,
  Theme
} from "@material-ui/core";
import {red} from "@material-ui/core/colors";
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
  }),
);

const PostCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="post" className={classes.avatar}>
            U
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon/>
          </IconButton>
        }
        title="User Name"
        subheader="September 14, 2021"
      />
      {props.children}
    </Card>
  );
}

export default PostCard;
