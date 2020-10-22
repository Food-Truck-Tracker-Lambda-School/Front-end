import React from 'react';
import styled from 'styled-components';

import { Button, ListSubheader, Box, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Rating } from '@material-ui/lab';

const SegmentStyle = styled.div`
boxShadow: 'none',
borderRight: 'none',
borderTop: 'none',
borderLeft: 'none',
margin: 0,
padding: 5,
display: 'flex',
justifyContent: 'space-between'
`;

export const TruckInfoBar = (props) => {
	return (
		<>
			<SegmentStyle>
				<Button
					icon
					onClick={() => {
						props.setInfoWindow({
							...props.infoWindow,
							visible: false,
						});
					}}
				>
					<ArrowBackIcon />
				</Button>

				{props.dinerInfo.favoriteTrucks ===
				undefined ? null : props.dinerInfo.favoriteTrucks.filter((truck) => {
						return truck.truckId === props.infoWindow.currentTruck.id;
				  }).length === 0 ? (
					<Button
						variant="outlined"
						color="red"
						icon
						onClick={() => {
							props.addFavoriteTruck(
								props.dinerInfo.roleId,
								props.infoWindow.currentTruck.id
							);
						}}
					>
						<FavoriteIcon />
					</Button>
				) : (
					<Button
						color="red"
						icon
						onClick={() => {
							props.deleteFavoriteTruck(
								props.dinerInfo.roleId,
								props.infoWindow.currentTruck.id
							);
						}}
					>
						<DeleteIcon />
					</Button>
				)}
			</SegmentStyle>

			<header>
				<h2 style={{ textAlign: 'center' }}>
					{props.infoWindow.currentTruck.truckName}
					<ListSubheader>
						Cuisine: {props.infoWindow.currentTruck.cuisine}
					</ListSubheader>
				</h2>
			</header>

			<Box component="fieldset" mb={3} borderColor="transparent">
				<Typography component="legend">Rate This Truck</Typography>
				<Rating
					style={{ width: 190, margin: '0 auto' }}
					onChange={(e, data) => {
						props.addTruckRating(
							props.infoWindow.currentTruck.id,
							props.dinerInfo.roleId,
							data.rating
						);
					}}
				/>
			</Box>
		</>
	);
};

export default TruckInfoBar;
