import React from 'react';
import Header from "../header/Header";
import ProfileInfo from "./ProfileInfo";

const Profile = () => {
  return (
    <div>
      <Header/>
      <ProfileInfo username={"Username"} email={"Email"}/>
    </div>
  )
}

export default Profile;
