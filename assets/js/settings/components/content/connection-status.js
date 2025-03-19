import { __ } from '@wordpress/i18n';
import { useTheme } from '@emotion/react';
import { Heading, TextSize, TextVariant } from '@proprietary/ui';
import {
	StyledConnectionStatus, StyledStatusIndicator,
} from './styles.js';

export default function ConnectionStatus( { connectionStatus = 'unknown' } ) {
	const [ statusText, headingText, color ] = useStatus( connectionStatus );

	return (
		<StyledConnectionStatus>
			<StyledStatusIndicator
				as="div"
				color={ color }
				iconPosition="right"
				indicator={ color }
				text={ statusText }
			/>

			<Heading
				level={ 2 }
				size={ TextSize.HUGE }
				variant={ TextVariant.DARK }
				text={ headingText }
			/>
		</StyledConnectionStatus>
	);
}

function useStatus( status ) {
	const theme = useTheme();

	switch ( status ) {
		case 'connected':
			return [ __( 'Site Connected', 'codeSamplePlugin' ), __( 'You’re connected to the Hub', 'codeSamplePlugin' ), '#15b22e' ];
		case 'unknown':
			return [ __( 'Checking Connection', 'codeSamplePlugin' ), __( 'Checking this site’s connection to the HUb', 'codeSamplePlugin' ), theme.colors.text.muted ];
		default:
			return [ __( 'Site Disconnected', 'codeSamplePlugin' ), __( 'Your Site is not connected to the Hub', 'codeSamplePlugin' ), '#B32D2E' ];
	}
}
