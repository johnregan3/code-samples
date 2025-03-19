/**
 * External dependencies
 */
import styled from '@emotion/styled';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Flex } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

/**
 * SolidWP dependencies
 */
import { Heading, Text, SurfaceVariant, TextSize, TextWeight } from '@ithemes/ui';

/**
 * Internal dependencies
 */
import storage from '../../images/storage.svg';
import { ConnectProgress, PageContainer, Gears } from '../components';
import { useConnect } from '../store/connect';

const StyledPageContainer = styled( PageContainer )`
	background-image: url(${ storage });
	background-repeat: no-repeat;
	background-position: bottom left;
`;

const StyledContent = styled( Flex )`
	z-index: 1;
`;

export default function Connect() {
	const connect = useConnect();
	useEffect( () => {
		connect();
	}, [ connect ] );

	return (
		<StyledPageContainer variant={ SurfaceVariant.PRIMARY }>
			<StyledContent direction="column" align="center" justify="center" gap={ 16 }>
				<Flex direction="column" align="center" justify="center" gap={ 4 } expanded={ false }>
					<Heading level={ 2 } size={ TextSize.GIGANTIC } weight={ TextWeight.NORMAL } text={ __( 'We’re connecting to your site', 'codeSamplePlugin' ) } />
					<Text as="p" align="center" text={ __( 'We’re focused on connecting your site to Solid Backups – NextGen, this may take a few minutes…', 'codeSamplePlugin' ) } />
				</Flex>
				<ConnectProgress />
			</StyledContent>
			<Gears />
		</StyledPageContainer>
	);
}
