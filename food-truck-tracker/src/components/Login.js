import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axiosWithAuth from "../utils/axiosWithAuth";
import styled from "styled-components";
import backImg from "../Images/LOGO Light Mode.jpg";
import { useHistory } from "react-router-dom";

const LogoImg = styled.div``;

const ErrorP = styled.p`
  font-size: 1.2rem;
  color: red;
`;

const ContDiv = styled.div`
  display: flex;
  flex-direction: row-reversed;
  @media (max-width: 1380px) {
    flex-direction: column;
    margin: 5% 15% 30% 20%;
    height: 20vh;
  }
`;

const LogDiv = styled.form`
  height: 15vh;
  background: #f97f0a;
  color: white;
  padding: 2%;
  border-radius: 10px;
  width: 300px;
`;

const ContLogDiv = styled.div`
  width: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
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
        const { message } = err.message;
        console.log("error data--->", message);
        alert(message);
      });
  };

  return (
    <ContDiv>
      <ContLogDiv>
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
              background: '#000000',
							color: '#F97F0A',
							borderRadius: '8px',
							width: '150px',
							height: '30px',
							fontSize: '1.2rem',
							border: 'none',
							marginTop: '4%',
            }}
            type="submit"
            data-cy="submit"
            disabled={buttonOff}
          >
            Log In
          </button>
        </LogDiv>
      </ContLogDiv>
      <LogoImg>
        <img
          src={backImg}
          alt="food Truck"
          style={{
            width: "650px",
            height: "90vh",
            left: "0",
            top: "5rem",
            opacity: "1",
          }}
        />
      </LogoImg>
    </ContDiv>
  );
};

export default Login;
