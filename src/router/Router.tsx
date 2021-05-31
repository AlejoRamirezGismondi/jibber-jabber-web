import {Route, Switch, BrowserRouter} from 'react-router-dom';
import React from 'react';
import ReverseAuthRoute from "./ReverseAuthRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import AuthRoute from "./AuthRoute";
import Search from "../pages/Search";

const Router = () => {

  return (
    <BrowserRouter>
      <Switch>
        <ReverseAuthRoute path={"/login"} component={Login}/>
        <ReverseAuthRoute path={"/register"} component={Register}/>
        <AuthRoute path={'/profile'} component={Profile}/>
        <Route path={"/"} component={Search}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;
