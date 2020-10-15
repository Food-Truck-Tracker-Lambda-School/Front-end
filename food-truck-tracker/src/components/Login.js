import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import styled from "styled-components";

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
    <form onSubmit={onSubmit}>
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
      </label>
    </form>
  );
};

export default Login;
