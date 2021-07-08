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
import {User} from "../models/User";
import {getToken} from "../utils/token";

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

const ProfileInfo = (props: User) => {
  const classes = useStyles();

  const [editEnabled, setEditEnabled] = useState<boolean>();
  const [firstName, setFirstName] = useState<string>(props.firstName);
  const [lastName, setLastName] = useState<string>(props.lastName);
  const [age, setAge] = useState<string>(props.age);
  const [email, setEmail] = useState<string>(props.email);

  function handleSubmit(event) {
    event.preventDefault();

    let token = getToken();

    axios.post(userUrl + `user/edit`, {
      firstName: firstName,
      lastName: lastName,
      age: age,
      email: email,
      userName: props.userName,
      id: 0
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(() => {
      setEditEnabled(false);
    });
  }

  if (editEnabled) {
    return (
      <Card className={classes.root}>
        <div className={classes.editIcon}>
          <IconButton aria-label="settings" onClick={() => {
            setEditEnabled(!editEnabled)
          }}>
            <EditIcon/>
          </IconButton>
        </div>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {firstName.charAt(0)}
            </Avatar>
          }
          className={classes.header}
        />
        <CardContent className={classes.content}>
          <form onSubmit={handleSubmit}>
            <h2>First Name</h2>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="firstName"
              label="firstName"
              id="firstName"
              placeholder={firstName}
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
            />
            <h2>Last Name</h2>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="lastName"
              label="LastName"
              id="lastName"
              placeholder={lastName}
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
            />
            <h2>Age</h2>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="age"
              label="age"
              id="age"
              placeholder={age}
              value={age}
              onChange={(e) => {
                setAge(e.target.value)
              }}
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
              placeholder={email}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
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
        <IconButton aria-label="settings" onClick={() => {
          setEditEnabled(!editEnabled)
        }}>
          <EditIcon/>
        </IconButton>
      </div>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {firstName.charAt(0)}
          </Avatar>
        }
        className={classes.header}
      />
      <CardContent className={classes.content}>
        <h2>First Name</h2>
        <Typography variant="body2" color="textSecondary" component="p">
          {firstName}
        </Typography>
        <h2>Last Name</h2>
        <Typography variant="body2" color="textSecondary" component="p">
          {lastName}
        </Typography>
        <h2>Age</h2>
        <Typography variant="body2" color="textSecondary" component="p">
          {age}
        </Typography>
        <h2>Email</h2>
        <Typography variant="body2" color="textSecondary" component="p">
          {email}
        </Typography>
        <Button href={'/change-password'}>
          Change password
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProfileInfo;
