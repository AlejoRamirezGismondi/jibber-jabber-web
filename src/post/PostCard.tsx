import React from 'react';
import {
  Avatar,
  Card,
  CardHeader,
  createStyles,
  makeStyles,
  Theme
} from "@material-ui/core";
import {red} from "@material-ui/core/colors";

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
    <Card className={[classes.root, props.className].join(' ')}>
      <CardHeader
        avatar={
          <Avatar aria-label="post" className={classes.avatar}>
            {props.username.charat(0)}
          </Avatar>
        }
        title={props.userName}
        subheader={props.date}
      />
      {props.children}
    </Card>
  );
}

export default PostCard;
