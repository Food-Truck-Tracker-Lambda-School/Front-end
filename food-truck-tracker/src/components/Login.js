import React, { useState } from 'react';
// import axios from "axios";
import axiosWithAuth from '../utils/axiosWithAuth';
import styled from 'styled-components';
import backImg from '../Images/backGround.png';

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
	const [formState, setFormState] = useState({
		username: '',
		password: '',
	});

	const onChange = (e) => {
		setFormState({ ...formState, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		axiosWithAuth()
			.post('/api/auth/login', formState)
			.then((resp) => {
				console.log('data response', resp.data);
				setFormState({
					username: '',
					password: '',
				});
				localStorage.setItem('roleId', resp.data.roleId);
				localStorage.setItem('token', resp.data.token);
			});
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
				</label>{' '}
				<br />
				<button
					style={{
						background: '#F9AE0a',
						color: '#A10E00',
						borderRadius: '8px',
						width: '150px',
						height: '30px',
						fontSize: '1.2rem',
						border: 'none',
						marginTop: '2%',
					}}
					type="submit"
					data-cy="submit"
					// disabled={buttonOff}
				>
					Log In
				</button>
			</LogDiv>
			<img
				src={backImg}
				alt="food Truck"
				style={{
					width: '99vw',
					height: '88vh',
					left: '0',
					top: '5rem',
					opacity: '0.6',
					zIndex: 1,
					position: 'absolute',
				}}
			/>
		</>
	);
};

export default Login;
