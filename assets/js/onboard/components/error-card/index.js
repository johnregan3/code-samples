/**
 * WordPress dependencies
 */
import { Flex } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * SolidWP dependencies
 */
import { Heading, TextSize, TextWeight } from '@ithemes/ui';

/**
 * Internal dependencies
 */
import error from '../../../images/error.png';
import { StyledActionsContainer, StyledErrorCard } from './styles';

export default function ErrorCard( { heading, actions, children } ) {
	return (
		<StyledErrorCard>
			<img width={ 120 } src={ error } alt={ __( 'An unhappy face, indicating an error.', 'codeSamplePlugin' ) } />
			<Flex direction="column" gap={ 3 } expanded={ false }>
				{ heading && <Heading level={ 2 } size={ TextSize.LARGE } text={ heading } weight={ TextWeight.HEAVY } /> }
				{ children }
			</Flex>
			{ actions && (
				<StyledActionsContainer>
					{ actions }
				</StyledActionsContainer>
			) }
		</StyledErrorCard>
	);
}
