import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import styled from "styled-components";

const LogDiv = styled.div`
  width: 400px;
  background: #6495ED;
  color: white;
  padding: 2%;
  position: fixed;
  margin: 2% 15% 15% 30%;
  border-radius: 10px;
  overflow: hidden;
`;

const Login = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post("https://reqres.in/api/users", formState).then((resp) => {
      console.log("data response", resp.data);
      setFormState({
        username: "",
        password: "",
      });
    });
  };

  return (
    <LogDiv onSubmit={onSubmit}>
      <label htmlFor='username'>
          <input
            id='username'
            name='username'
            data-cy='username'
            type='text'
            placeholder='Enter User Name'
            value={formState.username}
            onChange={onChange}
        />
        User Name
      </label>
      <label htmlFor='password'>
          <input
            id='password'
            name='password'
            data-cy='password'
            type='password'
            placeholder='Enter Password'
            value={formState.username}
            onChange={onChange}
        />
        User Name
      </label> <br/>
      <button
        style={{
          background: "black",
          color: "white",
          borderRadius: "8px",
          width: "150px",
          height: "30px",
          fontSize: "1.2rem",
          border: "none",
          marginTop: "2%",
        }}
        type="submit"
        data-cy="submit"
        // disabled={buttonOff}
      >
        Log In
      </button>
    </LogDiv>
  );
};

export default Login;
