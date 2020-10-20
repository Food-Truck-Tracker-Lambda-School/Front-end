import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axiosWithAuth from "../utils/axiosWithAuth";
import styled from "styled-components";
import backImg from "../Images/backGround.png";
import { useHistory } from "react-router-dom";

const LogDiv = styled.form`
  width: 400px;
  background: #a10c00;
  color: white;
  padding: 2%;
  position: fixed;
  margin: 2% 15% 15% 30%;
  border-radius: 10px;
  overflow: hidden;
  z-index: 2;
`;

const Login = () => {
  const history = useHistory();

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    e.persist();
    validateChanges(e);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  //validation coding below
  const [buttonOff, setButtonOff] = useState(true);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("User Name Required")
      .min(5, "Min 5 characters"),
    password: yup
      .string()
      .required("Password is Required")
      .min(6, "Min 6 characters"),
  });

  useEffect(() => {
    schema.isValid(formState).then((val) => {
      setButtonOff(!val);
    });
  }, [formState, schema]);

  const validateChanges = (e) => {
    yup
      .reach(schema, e.target.name)
      .validate(e.target.value)
      .then((val) => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    debugger
    axiosWithAuth()
      .post("/api/auth/login", formState)
      .then((resp) => {
        history.push("/dashboard");
        console.log("data response", resp.data);
        setFormState({
          username: "",
          password: "",
        });
      })
      .catch((err) => {
        const { message } = err.response.data
        console.log("error data", message)
      })
  };

  return (
    <>
      <LogDiv onSubmit={onSubmit}>
        <label htmlFor="username">
          <input
            id="username"
            name="username"
            data-cy="username"
            type="text"
            placeholder="Enter User Name"
            value={formState.username}
            onChange={onChange}
          />
          User Name
        </label>
        <label htmlFor="password">
          <input
            id="password"
            name="password"
            data-cy="password"
            type="password"
            placeholder="Enter Password"
            value={formState.password}
            onChange={onChange}
          />
          Password
        </label>{" "}
        <br />
        <button
          style={{
            background: "#F9AE0a",
            color: "#A10E00",
            borderRadius: "8px",
            width: "150px",
            height: "30px",
            fontSize: "1.2rem",
            border: "none",
            marginTop: "2%",
          }}
          type="submit"
          data-cy="submit"
          disabled={buttonOff}
        >
          Log In
        </button>
      </LogDiv>
      <img
        src={backImg}
        alt="food Truck"
        style={{
          width: "99vw",
          height: "88vh",
          left: "0",
          top: "5rem",
          opacity: "0.6",
          zIndex: 1,
          position: "absolute",
        }}
      />
    </>
  );
};

export default Login;
