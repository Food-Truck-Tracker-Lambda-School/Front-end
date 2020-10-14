import React, { useState, useEffect} from 'react'
import axios from 'axios'
import * as yup from 'yup'
import styled from 'styled-components'



const Registration = () => {


    //button state
    const[buttonOff, setButtonOff] = useState(true)

    //form input change function
    const onChange = (e) => {
        e.persist();
    }


    //onSubmit form function
    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="name">
                <input
                    id='name'
                    name='name'
                    data-cy='name'
                    placeholder="Enter Full Name Here"
                    type='text'
                    value=''
                    onChange={onChange}
                />Name
            </label>
            <label htmlFor='email'>
                <input
                    id='email'
                    name='email'
                    data-cy='email'
                    placeholder='email address'
                    type='email'
                    value=''
                    onChange={onChange}
                />Email Address
            </label>
            <label htmlFor='phone'>
                <input
                    id='phone'
                    name='phone'
                    data-cy='phone'
                    type='tel'
                    value=''
                    onChange={onChange}
                />Phone Number
            </label>
            <label htmlFor='userName'>
                <input
                    id='userName'
                    name='userName'
                    data-cy='userName'
                    type='text'
                    value=''
                    onChange={onChange}
                />User Name
            </label>
            <label htmlFor='passWord'>
                <input
                    id='passWord'
                    name='passWord'
                    data-cy='passWord'
                    type='passWord'
                    value=''
                    onChange={onChange}
                />Password
            </label>
            <label htmlFor='terms'>
                <input
                    id='terms'
                    name='terms'
                    value='terms'
                    data-cy='terms'
                    type='checkbox'
                    onChange={onChange}
                />Terms and Conditions
            </label>
            <button type='submit' data-cy='submit' disabled={buttonOff}>Register</button>
        </form>
    )
}

export default Registration
