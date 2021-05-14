import React from 'react';
import {
  Avatar, Card, CardActions,
  CardContent,
  CardHeader,
  createStyles, IconButton,
  makeStyles, TextField,
  Theme
} from "@material-ui/core";
import {red} from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SendIcon from '@material-ui/icons/Send';

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
      marginLeft: "auto"
    },
    textField: {
      minWidth: "300px"// TODO ahora esto mismo pero no con px
    }
  }),
);

const NewPost = () => {
  const classes = useStyles();

  return (
    <form>
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
      </Card>
    </form>
  );
}

export default NewPost;
