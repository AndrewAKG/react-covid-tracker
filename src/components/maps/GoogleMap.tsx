import styled from 'styled-components';
import GoogleMapReact, { Props } from 'google-map-react';
import { googleMapsApiKey } from '../../config';

interface MapProps extends Props {
	children?: any;
}

const Wrapper = styled.div`
	width: 100%;
	height: 100vh;
`;

export const GoogleMap = ({ children, ...props }: MapProps) => (
	<Wrapper>
		<GoogleMapReact
			bootstrapURLKeys={{
				key: googleMapsApiKey
			}}
			{...props}
		>
			{children}
		</GoogleMapReact>
	</Wrapper>
);
