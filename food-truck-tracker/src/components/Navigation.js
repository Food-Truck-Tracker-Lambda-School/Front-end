import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NavigationDiv = styled.div`
    width: 100%;
    background: #F97F0A;
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
            <a href='https://bw2awesomefoodtrucktrackermarketing.netlify.app/'>Home Page</a> <br/>
            <Link to='/registration'>New User - Register Here</Link> <br/>
            <Link to='/login'>Returning Users</Link>
        </NavigationDiv>
    )
}

export default Navigation
