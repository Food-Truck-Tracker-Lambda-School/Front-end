import React, { useState, useEffect, useRef } from 'react';
import {
	Map,
	GoogleApiWrapper,
	Marker,
	InfoWindow,
	Circle,
} from 'google-maps-react';
import { mapStyles } from '../../utils/mapStyles';

import {
	GridList,
	GridListTile,
	Card,
	CardHeader,
	CardContent,
	CardMedia,
	Typography,
} from '@material-ui/core';

import StarRateIcon from '@material-ui/icons/StarRate';

const mapStyle = {
	width: '100%',
	height: '100%',
	marginTop: '-1rem',
};

function MapContainer(props) {
	const circleRef = useRef();
	const [directionsRenderer] = useState(
		new props.google.maps.DirectionsRenderer({
			suppressMarkers: true,
		})
	);

	const [directionsService] = useState(
		new props.google.maps.DirectionsService()
	);

	const [, setMapReference] = useState(null);

	const [mapCenter, setMapCenter] = useState(false);

	const handleClickMarker = (propsMarker) => {
		props.setInfoWindow({
			visible: true,
			position: propsMarker.position,
			currentTruck: propsMarker.currentTruck,
		});
	};

	const handleInfoWindowClose = () => {
		props.setInfoWindow({
			...props.infoWindow,
			visible: false,
		});
	};

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.watchPosition(
				function (position) {
					props.setMyLocation({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
					console.log(position);
					if (props.myLocation !== '' && !mapCenter) {
						props.setMapCenter(props.myLocation);
						setMapCenter(true);
					}
				},
				function () {
					console.log('error position');
				}
			);
		}
	});

	useEffect(() => {
		if (props.destination !== null) {
			const request = {
				origin: props.myLocation,
				destination: props.destination.location,
				travelMode: 'DRIVING',
			};
			console.log(request);

			directionsService.route(request, function (result, status) {
				if (status === 'OK') {
					directionsRenderer.setDirections(result);
				} else {
					window.alert('Directions request failed due to ' + status);
				}
			});
		} else {
			directionsRenderer.setDirections({ routes: [] });
		}
	}, [props.destination, directionsRenderer, directionsService, props.myLocation]);

	const setDirectionsRenderer = (mapProps, map) => {
		setMapReference(map);
		directionsRenderer.setMap(map);
	};

	return (
		<Map
			google={props.google}
			disableDefaultUI={true}
			zoom={14}
			style={mapStyle}
			styles={mapStyles}
			center={props.mapCenter}
			onReady={setDirectionsRenderer}
		>
			<Marker
				position={props.myLocation}
				icon={{
					path: props.google.maps.SymbolPath.CIRCLE,
					scale: 8,
					strokeColor: '#00f',
					strokeWeight: 1,
					fillColor: '#00f',
					fillOpacity: 0.7,
				}}
			/>
			<Circle
				ref={circleRef}
				radius={1609.34 * props.milesRadius}
				center={props.myLocation}
				strokeColor="#00f"
				strokeOpacity={1}
				strokeWeight={1}
				fillColor="#00f"
				fillOpacity={0.2}
			/>
			{props.trucks.map((t, index) => {
				let coords = t.currentLocation.split(', ');
				if (t.departureTime > Date.now()) {
					return (
						<Marker
							key={index}
							name={'current Location'}
							position={{ lat: coords[0], lng: coords[1] }}
							data_truck={t}
							onClick={handleClickMarker}
						/>
					);
				}
			})}

			<InfoWindow
				visible={props.infoWindow.visible}
				position={props.infoWindow.position}
				style={{ top: -60 }}
				onClose={handleInfoWindowClose}
			>
				<GridList cellHeight={277} cols={1}>
					<GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
						<Card>
							<CardHeader
								title={props.infoWindow.currentTruck.truckName}
								subheader={`Cuisine: ${props.infoWindow.currentTruck.cuisine}`}
							/>
							<CardMedia
								image={props.infoWindow.currentTruck.truckImg}
								title={`${props.infoWindow.currentTruck.cuisine} food truck`}
								style={{ width: 290, height: 277 }}
							/>
							<CardContent>
								<Typography>
									At Location Until:{' '}
									{new Date(
										props.infoWindow.currentTruck.departureTime
									).toLocaleTimeString()}
								</Typography>
							</CardContent>
							<CardContent>
								<StarRateIcon />
								Average Rating:{' '}
								{`${props.infoWindow.currentTruck.avgRating} (${props.infoWindow.currentTruck.customerRatings.length})`}
							</CardContent>
						</Card>
					</GridListTile>
				</GridList>
			</InfoWindow>
		</Map>
	);
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyAKgYAy4mmkRtFlnYenEWKjuZPZ2c-JbMs',
})(MapContainer);
