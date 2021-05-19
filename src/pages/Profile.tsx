import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme['color-basic-100'],
    marginTop: 60
  },
}));

const Profile = () => {
  const themedStyle = useStyles();

  return (
    <div className={themedStyle.root}>

    </div>
  );
}

export default Profile;
