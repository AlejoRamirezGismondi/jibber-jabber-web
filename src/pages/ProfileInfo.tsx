import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';

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

  return (
    <Card className={classes.root}>
      <div className={classes.editIcon}>
        <IconButton aria-label="settings">
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
