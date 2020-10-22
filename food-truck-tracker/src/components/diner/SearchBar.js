import React from 'react';
import styled from 'styled-components';

import {
	TextField,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	ListSubheader,
	Button,
} from '@material-ui/core';

import LocationOnIcon from '@material-ui/icons/LocationOn';

const ContainerStyle = styled.div`
display: "flex",
flexDirection: "column",
flexWrap: "wrap",
justifyContent: "space-between",
borderLeft: "none",
borderRight: "none",
borderBottom: "none",
boxShadow: "none",
marginBottom: -10px,
paddingLeft: 5px,
paddingRight: 5px,
`;

export const SearchBar = (props) => {
	const handleOnSearch = (e) => {
		props.setSearchValue(e.target.value);
	};

	return (
		<>
			<TextField
				id="search"
				label="Search"
				type="search"
				onChange={handleOnSearch}
				value={props.searchValue}
			/>
			<div
				style={{
					overflow: 'auto',
					flexGrow: '1',
					marginTop: 10,
				}}
			>
				<List>
					{props.trucks
						.filter((filtertrucks) => {
							return (
								filtertrucks.name.includes(props.searchValue) ||
								filtertrucks.cuisine.includes(props.searchValue)
							);
						})
						.map((t, index) => {
							let coords = t.currentLocation.split(', ');
							return (
								<ListItem
									key={index}
									onClick={(e) => {
										if (t.departureTime > Date.now()) {
											props.setInfoWindow({
												visible: true,
												position: { lat: coords[0], lng: coords[1] },
												currentTruck: t,
											});
											props.RecenterMap({
												lat: coords[0],
												lng: coords[1],
											});
										}
									}}
								>
									<ListItemText style={{ floated: 'right' }}>
										{t.departureTime > Date.now() ? (
											<Button
												icon
												color="green"
												onClick={(e) => {
													e.stopPropagation();
													props.setDestination({
														location: {
															lat: parseFloat(coords[0]),
															lng: parseFloat(coords[1]),
														},
														truckName: t.truckName,
													});
												}}
												size="small"
											>
												<LocationOnIcon />
											</Button>
										) : null}
									</ListItemText>
									<ListItemAvatar
										src={t.imgUrl}
										style={{ width: '60px', height: '60px' }}
									/>
									<ListItemText primary={t.name} />
									<ListSubheader>{t.cuisine}</ListSubheader>
									<ListSubheader>
										{t.departureTime > Date.now()
											? `${coords[2]}, ${coords[3]}`
											: 'offline'}
									</ListSubheader>
								</ListItem>
							);
						})}
				</List>
			</div>
			<ContainerStyle>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						marginBottom: 10,
					}}
				>
					<h5 style={{ margin: 0 }}>
						Search Radius: {props.milesRadius} Miles
					</h5>
					<input
						type="range"
						min="1"
						max="10"
						onChange={props.handleRadiusChange}
						value={props.milesRadius}
					/>
				</div>

				<Button
					primary
					onClick={() => {
						props.RecenterMap(props.myLocation);
					}}
				>
					Go to My Location
				</Button>
			</ContainerStyle>
		</>
	);
};

export default SearchBar;
