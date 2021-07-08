import React, {useEffect, useState} from 'react';
import Header from "../header/Header";
import ProfileInfo from "./ProfileInfo";
import axios from "axios";
import {userUrl} from "../utils/http";
import {User} from "../models/User";
import {getToken} from "../utils/token";

const Profile = () => {

  const [user, setUser] = useState<User>();

  useEffect(() => {
    let token = getToken();

    axios.get(userUrl + 'user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setUser(response.data);
      })
  }, []);

  if (user) {
    return (
      <div>
        <Header/>
        <ProfileInfo userName={user.userName} id={user.id} following={user.following} firstName={user.firstName} lastName={user.lastName} age={user.age} email={user.email}/>
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
