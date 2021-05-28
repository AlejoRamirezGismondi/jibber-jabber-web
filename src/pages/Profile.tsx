import React, {useEffect, useState} from 'react';
import Header from "../header/Header";
import ProfileInfo from "./ProfileInfo";
import axios from "axios";
import {userUrl} from "../utils/http";

const Profile = () => {

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    let token = '';
    document.cookie.split(";").map(
      c => {
        if (c.startsWith("token=")) token = c.split("=")[1]
      }
    );

    console.log(token);

    axios.get(userUrl + 'user', {
      headers: {
        authorization: `bearer ${token}`
      }
    })
      .then(response => {
        setUsername(response.data.firstName);
        setEmail(response.data.email);
      })
  }, [username, email]);

  if (username && email) {
    return (
      <div>
        <Header/>
        <ProfileInfo username={username} email={email}/>
      </div>
    )
  } else {
    return (
      <div>
        <Header/>
      </div>
    );
  }
}

export default Profile;
