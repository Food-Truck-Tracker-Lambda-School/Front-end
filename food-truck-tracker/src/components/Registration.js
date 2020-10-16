import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import styled from 'styled-components';

const ErrorP = styled.p`
	font-size: 1.2rem;
	color: red;
`;

const RegDiv = styled.div`
	width: 400px;
	background: #6495ed;
	color: white;
	padding: 2%;
	position: fixed;
	margin: 2% 15% 15% 30%;
	border-radius: 10px;
	overflow: hidden;
`;

const Registration = () => {
	const [formState, setFormState] = useState({
		roleId: '',
		name: '',
		email: '',
		phoneNumber: '',
		username: '',
		password: '',

		terms: false,
	});
	//button state
	const [buttonOff, setButtonOff] = useState(true);

	//errors state
	const [errors, setErrors] = useState({
		roleId: '',
		name: '',
		email: '',
		phoneNumber: '',
		username: '',
		password: '',

		terms: '',
	});

	const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

	//validation code sections
	const schema = yup.object().shape({
		roleId: yup.string().oneOf(['truckOwner', 'customer']),
		name: yup
			.string()
			.required('Must Input Full Name')
			.min(4, 'Min 4 Characters Required'),
		email: yup
			.string()
			.email('Valid Email Required')
			.required('Email Required'),
		phoneNumber: yup.string().matches(phoneRegExp, 'Phone Number is not valid'),
		username: yup
			.string()
			.required('User Name Required')
			.min(5, 'Min 5 characters'),
		password: yup
			.string()
			.required('Password is Required')
			.min(6, 'Min 6 characters'),
		terms: yup.boolean().oneOf([true], "Please agree to T&C's"),
	});

	useEffect(() => {
		schema.isValid(formState).then((val) => {
			setButtonOff(!val);
		});
	}, [formState]);

	const validateChanges = (e) => {
		yup
			.reach(schema, e.target.name)
			.validate(
				e.target.type === 'checkbox' ? e.target.checked : e.target.value
			)
			.then((val) => {
				setErrors({ ...errors, [e.target.name]: '' });
			})
			.catch((err) => {
				setErrors({ ...errors, [e.target.name]: err.errors[0] });
			});
	};

	//form input change function
	const onChange = (e) => {
		e.persist();
		validateChanges(e);
		setFormState({
			...formState,
			[e.target.name]:
				e.target.type === 'checkbox' ? e.target.checked : e.target.value,
		});
	};

	//onSubmit form function
	const onSubmit = (e) => {
		e.preventDefault();
		axios
			.post('https://reqres.in/api/users', formState)
			.then((response) => {
				console.log('Data Response', response.data);
				setFormState({
					roleId: '',
					name: '',
					email: '',
					phoneNumber: '',
					username: '',
					password: '',

					terms: false,
				});
			})
			.catch((err) => console.log('error', err.response));
	};

	return (
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
					<option value="truckOwner">Chef / Truck Owner</option>
					<option value="customer">Foodie / Hungry Person</option>
				</select>
				{errors.roleId.length > 0 ? (
					<ErrorP style={{ color: 'red' }}>{errors.roleId}</ErrorP>
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
				/>{' '}
				Name
				{errors.name.length > 0 ? (
					<ErrorP style={{ color: 'red' }}>{errors.name}</ErrorP>
				) : null}
			</label>{' '}
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
				/>{' '}
				Email Address
				{errors.email.length > 0 ? (
					<ErrorP style={{ color: 'red' }}>{errors.email}</ErrorP>
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
					value={formState.phone}
					onChange={onChange}
				/>{' '}
				Phone Number
				{errors.phoneNumber.length > 0 ? (
					<ErrorP style={{ color: 'red' }}>{errors.phoneNumber}</ErrorP>
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
					value={formState.userName}
					onChange={onChange}
				/>{' '}
				User Name
				{errors.username.length > 0 ? (
					<ErrorP style={{ color: 'red' }}>{errors.username}</ErrorP>
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
				/>{' '}
				Password
				{errors.password.length > 0 ? (
					<ErrorP style={{ color: 'red' }}>{errors.password}</ErrorP>
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
				/>{' '}
				Terms and Conditions
				{errors.terms.length > 0 ? (
					<ErrorP style={{ color: 'red' }}>{errors.terms}</ErrorP>
				) : null}
			</label>
			<br></br>
			<button
				style={{
					background: 'black',
					color: 'white',
					borderRadius: '8px',
					width: '150px',
					height: '30px',
					fontSize: '1.2rem',
					border: 'none',
					marginTop: '2%',
				}}
				type="submit"
				data-cy="submit"
				disabled={buttonOff}
			>
				Register
			</button>
		</RegDiv>
	);
};

export default Registration;
