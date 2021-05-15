import {Route, Switch, BrowserRouter} from 'react-router-dom';
import React from 'react';
import ReverseAuthRoute from "./ReverseAuthRoute";
import AuthRoute from "./AuthRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

const Router = () => {

  return (
    <BrowserRouter>
      <Switch>
        <ReverseAuthRoute path={"/login"} component={Login}/>
        <AuthRoute path={'/profile'} component={Profile}/>
        <Route path={"/"} component={Home}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;
