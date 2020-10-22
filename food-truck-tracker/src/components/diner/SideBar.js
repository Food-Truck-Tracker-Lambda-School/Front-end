import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import TruckInfoBar from './TruckInfoBar';

const SideBarStyle = styled.div`
	position: 'absolute',
	top: 70,
	left: 10,
	width: 350,
	bottom: 10,
	zIndex: 100,
	display: 'flex',
	flexDirection: 'column',
`;

function SideBar(props) {
    const [searchValue, setSearchValue] = useState('');
    
	const handleRadiusChange = (e) => {
		props.setRadius(e.target.value);
	};

	return (
		<SideBarStyle>
			{props.infoWindow.visible ? (
				<TruckInfoBar
					infoWindow={props.infoWindow}
					setInfoWindow={props.setInfoWindow}
					addFavoriteTruck={props.addFavoriteTruck}
					deleteFavoriteTruck={props.deleteFavoriteTruck}
					addTruckRating={props.addTruckRating}
					addMenuRating={props.addMenuRating}
					dinerInfo={props.dinerInfo}
				/>
			) : (
				<SearchBar
					handleRadiusChange={handleRadiusChange}
					trucks={props.trucks}
					setDestination={props.setDestination}
					setInfoWindow={props.setInfoWindow}
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					RecenterMap={props.RecenterMap}
					myLocation={props.myLocation}
					milesRadius={props.milesRadius}
				/>
			)}
		</SideBarStyle>
	);
}

export default SideBar;
