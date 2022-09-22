import React from 'react';
import GoogleMap from 'google-map-react';
import { lightGreyBlue } from '@core/data/mapStyles';

const Maps = () => {
	const defaultProps = {
		center: {
			lat: 51.52899231312338,
			lng: -0.056282497697537556
		},
		zoom: 12
	};

	const renderMarkers = (map, maps) => {
		const marker = new maps.Marker({
			position: defaultProps.center,
			map,
		});
		return marker;
	};

	return (
		<div style={{ height: '50vh', width: '100%' }}>
			<GoogleMap
				bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API }}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
				options={{
					styles: lightGreyBlue
				}}
				onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
				yesIWantToUseGoogleMapApiInternals
			>
			</GoogleMap>
		</div>
	);
};

export default Maps;