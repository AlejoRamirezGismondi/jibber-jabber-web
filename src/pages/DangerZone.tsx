import React, {useRef, useState} from 'react';
import Header from "../header/Header";
import TextField from "@material-ui/core/TextField";
import {getToken} from "../utils/token";
import axios from "axios";
import {userUrl} from "../utils/http";
import {Button, createStyles, makeStyles, Theme} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }))

const DangerZone = () => {
  const [newPassword, setNewPassword] = useState<string>();
  const [oldPassword, setOldPassword] = useState<string>();
  const newPasswordInput = useRef(null);
  const oldPasswordInput = useRef(null);
  const classes = useStyles();

  function handleSubmit(event) {
    event.preventDefault();

    let token = getToken();

    axios.post(userUrl + `user/changePassword`, {
      data: {
        oldPassword: oldPassword,
        newPassword: newPassword
      }
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        newPasswordInput.current.value = '';
        oldPasswordInput.current.value = '';
      });
  }

  return(
    <div>
      <Header/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              ref={oldPasswordInput}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="old-password"
              label="Old Password"
              name="old-password"
              type="password"
              autoFocus
              onChange={(e) => {setOldPassword(e.target.value)}}
            />
            <TextField
              ref={newPasswordInput}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="new-password"
              label="New Password"
              type="password"
              id="new-password"
              onChange={(e) => {setNewPassword(e.target.value)}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default DangerZone;
