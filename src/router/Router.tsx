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

const Router = () => {

  return (
    <BrowserRouter>
      <Switch>
        <ReverseAuthRoute path={"/login"} component={Login}/>
        <ReverseAuthRoute path={"/register"} component={Register}/>
        <AuthRoute path={'/profile'} component={Profile}/>
        <Route path={"/change-password"} component={DangerZone}/>
        <Route path={'/user/:id'} component={UserProfile}/>
        <Route path={"/"} component={Search}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;
