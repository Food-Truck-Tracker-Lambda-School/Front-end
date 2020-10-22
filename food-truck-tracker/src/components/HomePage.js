import React from "react";
import homeImg from "../Images/LOGO Light Mode.jpg";
import styled from "styled-components";

const ImageBackground = styled.div`
  vertical-align: top;
  display: flex;

  @media (max-width: 1450px) {
	  flex-direction: column;
	  margin: 0, auto;
	  text-align: center;
  }
`;
const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  margin-left: 10rem;
  text-align: center;
`;

const HomePage = () => {
  return (
    <ImageBackground>
      <TextDiv>
        <h1
          style={{
            // position: 'fixed',
            color: "#161E2A",
            fontSize: "4rem",
            // marginLeft: '20%',
            fontFamily: "Sansita Swashed",
          }}
        >
          Food Truck Tracker!
        </h1>
        <h4
          style={{
            // position: 'fixed',
            color: "#161E2A",
            fontSize: "2.5rem",
            // marginLeft: '40%',
            // marginTop: '10%',
            fontFamily: "Sansita Swashed",
          }}
        >
          Find Your Favorite Truck!
        </h4>
      </TextDiv>

      <img
        src={homeImg}
        alt="food Truck"
        style={{ width: "50vw", height: "85vh" }}
      />
    </ImageBackground>
  );
};

export default HomePage;
