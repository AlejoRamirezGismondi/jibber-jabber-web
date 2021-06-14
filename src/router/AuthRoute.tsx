import { Route, Redirect } from 'react-router-dom';
import {getToken} from "../utils/token";

interface props {component: Function, path:string}

const AuthRoute = ({component: Component, ...rest}: props) => {
  return (
    <Route {...rest}
           render={props => {
             //Auth method may change (this is just an mock)
             if (getToken()) return <Component {...props}/>;
             return <Redirect to={{
               pathname: '/login',
               state: {from: props.location}
             }}/>;
           }}/>

  )
}

export default AuthRoute;
