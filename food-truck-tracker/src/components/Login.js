import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axiosWithAuth from "../utils/axiosWithAuth";
import styled from "styled-components";
import backImg from "../Images/LOGO Light Mode.jpg";
import { useHistory } from "react-router-dom";

const ErrorP = styled.p`
  font-size: 1.2rem;
  color: red;
`;

const ContDiv = styled.div`
  display: flex;
  flex-direction: row-reversed;
  @media (max-width: 1050px) {
    flex-direction: column;
    margin: 5% 30% 30% 15%;
    height: 20vh;
  }
`;

const LogDiv = styled.form`
  height: 15vh;
  background: #a10c00;
  color: white;
  padding: 2%;
  // position: fixed;
  margin: 10% 10% 10% 10%;
  border-radius: 10px;

`;

const Login = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const history = useHistory();

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
    axiosWithAuth()
      .post("/api/auth/login", formState)
      .then((resp) => {
        console.log("data response", resp.data);
        localStorage.setItem("roleId", resp.data.roleId);
        localStorage.setItem("token", resp.data.token);
        setFormState({
          username: "",
          password: "",
        });
        history.push("/dashboard");
      })
      .catch((err) => {
        const { message } = err.response.data;
        console.log("error data--->", message);
        alert(message);
      });
  };

  return (
    <ContDiv>
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
          {errors.username.length > 0 ? (
            <ErrorP style={{ color: "red" }}>{errors.username}</ErrorP>
          ) : null}
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
          {errors.password.length > 0 ? (
            <ErrorP style={{ color: "red" }}>{errors.password}</ErrorP>
          ) : null}
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
          width: "50vw",
          height: "90vh",
          left: "0",
          top: "5rem",
          opacity: "1",
          // zIndex: 1,
          // position: "absolute",
        }}
      />
    </ContDiv>
  );
};

export default Login;
