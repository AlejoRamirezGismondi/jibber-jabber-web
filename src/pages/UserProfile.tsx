import React, {useEffect, useState} from 'react';
import Header from "../header/Header";
import { useParams } from "react-router";
import axios from "axios";
import {userUrl} from "../utils/http";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    axios.get(userUrl + 'user/'+id)
      .then(response => {
        setUser(response.data);
      })
  });

  return (
    <>
      <Header/>
    </>
  );
}

export default UserProfile;
