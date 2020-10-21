import React from 'react'
import styled from 'styled-components';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Typography } from '@material-ui/core';


const ClearRouteSegmentStyle = styled.div`
    position: 'absolute',
    zIndex: 1000px,
    right: 10px,
    bottom: 10px,
    display: 'flex',
    alignItems: 'center',
`

export const ClearRoute = (props) => {
    return (
        props.destination !== null ? (
        <ClearRouteSegmentStyle>
            <LocationOnIcon fontSize='large' />
            <div>
                <Typography variant='h3' component='h4' style={{color: 'red', marginLeft: 20, marginRight: 20}}>
                    This is your current route
                </Typography>
                <br />
                <h2
            </div>
        </ClearRouteSegmentStyle>
        ) : null
    )
}

export default ClearRoute
