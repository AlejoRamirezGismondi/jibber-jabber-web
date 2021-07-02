import {Route, Switch, BrowserRouter} from 'react-router-dom';
import React from 'react';
import ReverseAuthRoute from "./ReverseAuthRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import AuthRoute from "./AuthRoute";
import Search from "../pages/Search";
import DangerZone from "../pages/DangerZone";
import UserProfile from "../pages/UserProfile";
import Home from "../pages/Home";
import MyPosts from "../pages/MyPosts";
import ChatFeed from "../chat/ChatFeed";
import Chat from "../chat/Chat";

const Router = () => {

  return (
    <BrowserRouter>
      <Switch>
        <ReverseAuthRoute path={"/login"} component={Login}/>
        <ReverseAuthRoute path={"/register"} component={Register}/>
        <AuthRoute path={'/profile'} component={Profile}/>
        <AuthRoute path={"/change-password"} component={DangerZone}/>
        <AuthRoute path={"/chat/:id"} component={DangerZone}/>
        <AuthRoute path={"/my-posts"} component={MyPosts}/>
        <AuthRoute path={"/chat/:id"} component={Chat}/>
        <AuthRoute path={"/chats"} component={ChatFeed}/>
        <Route path={'/user/:id'} component={UserProfile}/>
        <Route path={'/search'} component={Search}/>
        <AuthRoute path={"/"} component={Home}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;
