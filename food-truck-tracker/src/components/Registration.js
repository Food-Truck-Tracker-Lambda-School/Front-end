import React, { useState, useEffect} from 'react'
import axios from 'axios'
import * as yup from 'yup'
import styled from 'styled-components'

const ErrorP = styled.p`
    font-size: 1.2rem;
    color: red;
`



const Registration = () => {

    const[formState, setFormState] = useState({
        type: '',
        name: '',
        email:'',
        phone:'', 
        userName:'',
        password:'',
        passwordConfirm:'',
        terms: false,
    })
    //button state
    const[buttonOff, setButtonOff] = useState(true)

    //errors state
    const[errors, setErrors]=useState({
        type: '',
        name: '',
        email:'',
        phone:'', 
        userName:'',
        password:'',
        passwordConfirm:'',
        terms: '', 
    })
    
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
   
    //validation code sections
    const schema = yup.object().shape({
        type: yup.string().oneOf(["truckOwner", "customer"]),
        name: yup.string().required("Must Input Full Name").min(4, "Min 4 Characters Required"),
        email: yup.string().email("Valid Email Required").required("Email Required"),
        phone: yup.string().matches(phoneRegExp, "Phone Number is not valid"),
        userName: yup.string().required("User Name Required").min(5, "Min 5 characters"),
        password: yup.string().required("Password is Required").min(6, "Min 6 characters"),
        passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must Match'),
        terms: yup.boolean().oneOf([true], "Please agree to T&C's"),
    })

    useEffect(() => {
        schema.isValid(formState)
        .then((val) => {
            setButtonOff(!val)
        })
        
    }, [formState])

    const validateChanges = (e) => {
        yup.reach(schema, e.target.name)
        .validate(e.target.type==='checkbox' ? e.target.checked : e.target.value)
        .then((val) => {
            setErrors({...errors, [e.target.name]: ''})
        })
        .catch((err) => {
            setErrors({...errors, [e.target.name]: err.errors[0]})
        })
    }

    //form input change function
    const onChange = (e) => {
        e.persist();
        validateChanges(e)
        setFormState({...formState, [e.target.name]: e.target.type==="checkbox" ? e.target.checked : e.target.value})
    }


    //onSubmit form function
    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('https://reqres.in/api/users', formState)
        .then(response => {
            console.log("Data Response", response.data)
            setFormState({
                type: '',
                name: '',
                email:'',
                phone:'', 
                userName:'',
                password:'',
                passwordConfirm:'',
                terms: false,
            })
        }).catch(err => console.log("error", err.response))
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="type">
                <select
                    id='type'
                    name='type'
                    data-cy='type'
                    value={formState.type}
                    onChange={onChange}
                >
                    <option value="">---Choose One---</option>
                    <option value="truckOwner">Chef / Truck Owner</option>
                    <option value="customer">Foodie / Hungry Person</option>
                </select>
                {errors.type.length > 0 ? <ErrorP style={{color:"red"}}>{errors.type}</ErrorP> : null }
            </label>
            <label htmlFor="name">
                <input
                    id='name'
                    name='name'
                    data-cy='name'
                    placeholder="Enter Full Name Here"
                    type='text'
                    value={formState.name}
                    onChange={onChange}
                />Name
                {errors.name.length > 0 ? <ErrorP style={{color:"red"}}>{errors.name}</ErrorP> : null }
            </label>
            <label htmlFor='email'>
                <input
                    id='email'
                    name='email'
                    data-cy='email'
                    placeholder='email address'
                    type='email'
                    value={formState.email}
                    onChange={onChange}
                />Email Address
                {errors.email.length > 0 ? <ErrorP style={{color:"red"}}>{errors.email}</ErrorP> : null }
            </label>
            <label htmlFor='phone'>
                <input
                    id='phone'
                    name='phone'
                    data-cy='phone'
                    type='tel'
                    value={formState.phone}
                    onChange={onChange}
                />Phone Number
                {errors.phone.length > 0 ? <ErrorP style={{color:"red"}}>{errors.phone}</ErrorP> : null }
            </label>
            <label htmlFor='userName'>
                <input
                    id='userName'
                    name='userName'
                    data-cy='userName'
                    type='text'
                    value={formState.userName}
                    onChange={onChange}
                />User Name
                {errors.userName.length > 0 ? <ErrorP style={{color:"red"}}>{errors.userName}</ErrorP> : null }
            </label>
            <label htmlFor='password'>
                <input
                    id='password'
                    name='password'
                    data-cy='password'
                    type='password'
                    placeholder='select password'
                    value={formState.password}
                    onChange={onChange}
                />Password
                {errors.password.length > 0 ? <ErrorP style={{color:"red"}}>{errors.password}</ErrorP> : null }
            </label>
            <label htmlFor='passwordConfirm'>
                <input
                    id='passwordConfirm'
                    name='passwordConfirm'
                    data-cy='passwordConfirm'
                    type='password'
                    placeholder='re-enter password'
                    value={formState.passwordConfirm}
                    onChange={onChange}
                />Password Conformation
                {errors.passwordConfirm.length > 0 ? <ErrorP style={{color:"red"}}>{errors.passwordConfirm}</ErrorP> : null }
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
                {errors.terms.length > 0 ? <ErrorP style={{color:"red"}}>{errors.terms}</ErrorP> : null }
            </label>
            <button type='submit' data-cy='submit' disabled={buttonOff}>Register</button>
        </form>
    )
}

export default Registration
