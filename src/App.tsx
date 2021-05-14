import React from 'react';
import './App.css';
import Header from "./header/Header";
import Feed from "./feed/Feed";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import NewPost from "./post/NewPost";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#b39ddb',
      main: '#673ab7',
      dark: '#311b92',
      contrastText: '#fafafa',
    },
    secondary: {
      light: '#ffd54f',
      main: '#ffc107',
      dark: '#ff6f00',
      contrastText: '#fafafa',
    },
    background: {
      default:  '#fafafa',
      paper:  '#ede7f6'
    },
    text: {
      primary: '#adacac',
      secondary: '#7f7f7f',
    },
    action: {
      disabled: '#7f7f7f',
    }
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Header/>
        <NewPost/>
        <Feed/>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
