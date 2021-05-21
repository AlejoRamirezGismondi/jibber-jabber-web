import {Route, Switch, BrowserRouter} from 'react-router-dom';
import React from 'react';
import ReverseAuthRoute from "./ReverseAuthRoute";
import AuthRoute from "./AuthRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";

const Router = () => {

  return (
    <BrowserRouter>
      <Switch>
        <ReverseAuthRoute path={"/login"} component={Login}/>
        <ReverseAuthRoute path={"/register"} component={Register}/>
        <Route path={'/profile'} component={Profile}/>
        {/*Change to AuthRoute later*/}
        <Route path={"/"} component={Home}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;
