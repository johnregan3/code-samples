/**
 * External dependencies
 */
import styled from '@emotion/styled';

/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { GearFolder, GearPlugin, GearSidebar } from '../../../images';

const StyledGearSidebar = styled( GearSidebar )`
	position: absolute;
	right: 145px;
	bottom: 305px;
	z-index: 0;
`;

const StyledGearPlugin = styled( GearPlugin )`
	position: absolute;
	right: 109px;
	bottom: 172px;
	z-index: 0;
`;

const StyledGearFolder = styled( GearFolder )`
	position: absolute;
	right: 297px;
	bottom: 116px;
	z-index: 0;
`;

export default function Gears() {
	if ( ! useViewportMatch( 'medium' ) ) {
		return null;
	}

	return (
		<>
			<StyledGearSidebar />
			<StyledGearPlugin />
			<StyledGearFolder />
		</>
	);
}
