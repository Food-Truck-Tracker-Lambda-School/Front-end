import React from 'react'
import styled from 'styled-components';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Typography } from '@material-ui/core';


const ClearRouteStyle = styled.div`
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
        <ClearRouteStyle>
            <LocationOnIcon fontSize='large' />
            <div>
                <Typography variant='h3' component='h4' style={{color: 'red', marginLeft: 20, marginRight: 20}}>
                    This is your current route
                    <Typography variant='subtitle1'>
                        Route from Current Location to {props.destination.truckName}
                    </Typography>
                </Typography>
            </div>

            
        </ClearRouteStyle>
        ) : null
    )
}

export default ClearRoute
