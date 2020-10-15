import React from 'react'
import homeImg from '../Images/homepage.png'
import styled from 'styled-components'

const ImageBackground = styled.div`
  vertical-align: top;
  display: block;
  width: 100vw;
`;


const HomePage = () => {
    return (
        <ImageBackground>
        <h1
        style={{
          position: "fixed",
          color: "#161E2A",
          fontSize: "5rem",
          marginLeft: "20%",
          fontFamily: "Sansita Swashed",
        }}
      >
        Food Truck Tracker!
      </h1>
      <h4
        style={{
          position: "fixed",
          color: "white",
          fontSize: "2.3rem",
          marginLeft: "40%",
          marginTop: "31%",
          fontFamily: "Sansita Swashed",
        }}
      >
        Find Your Favorite Truck!
      </h4>
      <img
        src={homeImg}
        alt="food Truck"
        style={{ width: "100vw", height: "100vh" }}
      />

        </ImageBackground>
    )
}

export default HomePage