import styled from '@emotion/styled';
import { useCallback } from '@wordpress/element';
import { SurfaceVariant } from '@proprietary/ui';
import backgroundWelcome from '../../images/background-welcome.png';
import { PageContainer, WelcomeIntro, WelcomeBody, WelcomeFooter } from '../components';

export const StyledPageContainer = styled( PageContainer )`
	@media screen and (min-width: ${ ( { theme } ) => theme.breaks.medium }px) {
		background-image: url(${ backgroundWelcome });
		background-repeat: no-repeat;
		background-size: contain;
		background-position-y: 500px;
	}

`;

export default function Welcome( { dispatch } ) {
	const beginOnboarding = useCallback( ( ) => {
		dispatch( { type: 'BEGIN_ONBOARDING' } );
	}, [ dispatch ] );

	return (
		<>
			<StyledPageContainer variant={ SurfaceVariant.PRIMARY_CONTRAST }>
				<WelcomeIntro beginOnboarding={ beginOnboarding } />
				<WelcomeBody beginOnboarding={ beginOnboarding } />
			</StyledPageContainer>
			<WelcomeFooter />
		</>
	);
}
