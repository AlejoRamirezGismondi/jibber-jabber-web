import React, {useRef, useState} from 'react';
import Header from "../header/Header";
import TextField from "@material-ui/core/TextField";
import {getToken} from "../utils/token";
import axios from "axios";
import {userUrl} from "../utils/http";

const DangerZone = () => {
  const [password, setPassword] = useState<string>('');
  const input = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();

    let token = getToken();

    axios.post(userUrl + `user/change-password`, {
      data: {
        password
      }
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        input.current.value = '';
      });
  }

  return(
    <div>
      <Header/>
      <form onSubmit={handleSubmit}>
        <h2>First Name</h2>
        <TextField
          ref={input}
          variant="outlined"
          margin="normal"
          required
          type={password}
          fullWidth
          name="password-input"
          label="password-input"
          id="password-input"
          placeholder={'Change your password'}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </form>
    </div>
  );
}

export default DangerZone;
