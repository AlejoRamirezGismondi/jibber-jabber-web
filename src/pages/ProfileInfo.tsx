import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import {userUrl} from "../utils/http";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "column"
  },
  avatar: {
    backgroundColor: red[500],
    width: theme.spacing(10),
    height: theme.spacing(10),
    fontSize: "xxx-large"
  },
  header: {
    alignSelf: "center"
  },
  content: {
    alignSelf: "center",
    fontSize: "x-large"
  },
  editIcon: {
    marginLeft: "auto"
  }
}));

interface Props {
  username: string,
  email: string
}

const ProfileInfo = (props: Props) => {
  const classes = useStyles();

  const [editEnabled, setEditEnabled] = useState<boolean>();
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();

  function handleSubmit(event) {
    event.preventDefault();

    let token = '';
    document.cookie.split(";").map(
      c => {
        if (c.startsWith("token=")) token = c.split("=")[1]
      }
    );

    axios.post(userUrl+`user/edit`, {
      headers: {
        authorization: `bearer ${token}`
      },
      data: {
        firstName: username,
        email: email
      }
    })
      .then(response => {
        document.cookie=`token=${response.data};`
      });
  }

  if (editEnabled) {
    return (
      <Card className={classes.root}>
        <div className={classes.editIcon}>
          <IconButton aria-label="settings" onClick={() => {setEditEnabled(!editEnabled)}}>
            <EditIcon/>
          </IconButton>
        </div>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.username.charAt(0)}
            </Avatar>
          }
          className={classes.header}
        />
        <CardContent className={classes.content}>
          <form onSubmit={handleSubmit}>
            <h2>Username</h2>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="username"
              label="username"
              id="username"
              placeholder={props.username}
              onChange={(e) => {setUsername(e.target.value)}}
            />
            <h2>Email</h2>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="email"
              label="email"
              id="email"
              placeholder={props.email}
              onChange={(e) => {setEmail(e.target.value)}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={classes.root}>
      <div className={classes.editIcon}>
        <IconButton aria-label="settings" onClick={() => {setEditEnabled(!editEnabled)}}>
          <EditIcon/>
        </IconButton>
      </div>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.username.charAt(0)}
          </Avatar>
        }
        className={classes.header}
      />
      <CardContent className={classes.content}>
        <h2>Username</h2>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.username}
        </Typography>
        <h2>Email</h2>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.email}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProfileInfo;
