import React, { useState, useEffect } from "react";
import * as yup from "yup";
import styled from "styled-components";
import backImg from "../Images/LOGO Light Mode.jpg";
import axiosWithAuth from "../utils/axiosWithAuth";
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
const RegDiv = styled.form`
  height: 30vh;
  margin: 10% 10% 10% 10%;
  background: #a10c00;
  color: white;
  padding: 2%;
  border-radius: 10px;
`;

const Registration = () => {
  const history = useHistory();

  const [formState, setFormState] = useState({
    roleId: "",
    name: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    terms: false,
  });
  //button state
  const [buttonOff, setButtonOff] = useState(true);
  //errors state
  const [errors, setErrors] = useState({
    roleId: "",
    name: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    terms: "",
  });
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  //validation code sections
  const schema = yup.object().shape({
    roleId: yup.string().oneOf(["1", "2"]),
    name: yup
      .string()
      .required("Must Input Full Name")
      .min(4, "Min 4 Characters Required"),
    email: yup
      .string()
      .email("Valid Email Required")
      .required("Email Required"),
    phoneNumber: yup.string().matches(phoneRegExp, "Phone Number is not valid"),
    username: yup
      .string()
      .required("User Name Required")
      .min(5, "Min 5 characters"),
    password: yup
      .string()
      .required("Password is Required")
      .min(6, "Min 6 characters"),
    terms: yup.boolean().oneOf([true], "Please agree to T&C's"),
  });
  useEffect(() => {
    schema.isValid(formState).then((val) => {
      setButtonOff(!val);
    });
  }, [formState, schema]);
  const validateChanges = (e) => {
    yup
      .reach(schema, e.target.name)
      .validate(
        e.target.type === "checkbox" ? e.target.checked : e.target.value
      )
      .then((val) => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  };
  //form input change function
  const onChange = (e) => {
    e.persist();
    validateChanges(e);
    let value = e.target.value;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    } else if (e.target.name === "roleId") {
      value = parseInt(e.target.value); // moving the roleId values in the return to integers for database
    } else if (e.target.name === "phoneNumber") {
      value = parseInt(e.target.value); // making phone number input an integer for database
    }
    setFormState({
      ...formState,
      [e.target.name]: value,
    });
  };
  //onSubmit form function
  const onSubmit = (e) => {
    e.preventDefault();
    const { terms, ...postState } = formState;
    axiosWithAuth()
      .post("/api/auth/register", postState)
      .then((response) => {
        history.push("/dashboard");
        console.log("Data Response", response.data);
        setFormState({
          roleId: "",
          name: "",
          email: "",
          phoneNumber: "",
          username: "",
          password: "",
          terms: false,
        });
      })
      .catch((err) => {
        const { message } = err.response.data;
        console.log("error data--->", message);
        alert("Username already exists. Please choose another");
      });
  };
  return (
    <ContDiv>
      <RegDiv onSubmit={onSubmit}>
        <label htmlFor="roleId">
          <select
            id="roleId"
            name="roleId"
            data-cy="roleId"
            value={formState.type}
            onChange={onChange}
          >
            <option value="">---Choose One---</option>
            <option value="2">Chef / Truck Owner</option>
            <option value="1">Foodie / Hungry Person</option>
          </select>
          {errors.roleId.length > 0 ? (
            <ErrorP style={{ color: "red" }}>{errors.roleId}</ErrorP>
          ) : null}
          User Type
        </label>
        <br></br>
        <label htmlFor="name">
          <input
            id="name"
            name="name"
            data-cy="name"
            placeholder="Enter Full Name Here"
            type="text"
            value={formState.name}
            onChange={onChange}
          />{" "}
          Name
          {errors.name.length > 0 ? (
            <ErrorP style={{ color: "red" }}>{errors.name}</ErrorP>
          ) : null}
        </label>{" "}
        <br></br>
        <label htmlFor="email">
          <input
            id="email"
            name="email"
            data-cy="email"
            placeholder="email address"
            type="email"
            value={formState.email}
            onChange={onChange}
          />{" "}
          Email Address
          {errors.email.length > 0 ? (
            <ErrorP style={{ color: "red" }}>{errors.email}</ErrorP>
          ) : null}
        </label>
        <br></br>
        <label htmlFor="phoneNumber">
          <input
            id="phoneNumber"
            name="phoneNumber"
            data-cy="phoneNumber"
            type="tel"
            placeholder="phone num with area code"
            value={formState.phoneNumber}
            onChange={onChange}
          />{" "}
          Phone Number
          {errors.phoneNumber.length > 0 ? (
            <ErrorP style={{ color: "red" }}>{errors.phoneNumber}</ErrorP>
          ) : null}
        </label>
        <br></br>
        <label htmlFor="username">
          <input
            id="username"
            name="username"
            data-cy="username"
            placeholder="select user name"
            type="text"
            value={formState.username}
            onChange={onChange}
          />{" "}
          User Name
          {errors.username.length > 0 ? (
            <ErrorP style={{ color: "red" }}>{errors.username}</ErrorP>
          ) : null}
        </label>
        <br></br>
        <label htmlFor="password">
          <input
            id="password"
            name="password"
            data-cy="password"
            type="password"
            placeholder="select password"
            value={formState.password}
            onChange={onChange}
          />{" "}
          Password
          {errors.password.length > 0 ? (
            <ErrorP style={{ color: "red" }}>{errors.password}</ErrorP>
          ) : null}
        </label>
        <br></br>
        <br></br>
        <label htmlFor="terms">
          <input
            id="terms"
            name="terms"
            value="terms"
            data-cy="terms"
            type="checkbox"
            onChange={onChange}
          />{" "}
          Terms and Conditions
          {errors.terms.length > 0 ? (
            <ErrorP style={{ color: "red" }}>{errors.terms}</ErrorP>
          ) : null}
        </label>
        <br></br>
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
          Register
        </button>
      </RegDiv>
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
export default Registration;
