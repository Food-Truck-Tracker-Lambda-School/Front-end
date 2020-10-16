import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NavigationDiv = styled.div`
    width: 100%;
    background: green;
    display: flex;
    justify-content: flex-end;
    height: 5rem;
    align-items: center;
    a {
        text-decoration: none;
        margin-right: 3%;
        color: white;
        font-size: 1.4rem;
    }
`

const Navigation = () => {
    return (
        <NavigationDiv>
            <Link to='/'>Home Page</Link> <br/>
            <Link to='/registration'>Register Here</Link> <br/>
            <Link to='/login'>Returning Users</Link>
        </NavigationDiv>
    )
}

export default Navigation
