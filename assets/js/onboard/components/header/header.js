/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { close } from '@wordpress/icons';
import { useViewportMatch } from '@wordpress/compose';

/**
 * SolidWP dependencies
 */
import { Button, TextSize } from '@ithemes/ui';

/**
 * Internal dependencies
 */
import { useProgress } from '../../store/context';
import { ProgressIndicator } from '../progress-indicator';
import { getAdminUrl } from '../../utils';
import {
	StyledHeaderContainer,
	StyledButtonHeader,
	StyledConnectingHeader,
	StyledLogo,
	StyledActions,
	StyledButtonDivider,
	StyledCloseButton,
} from './styles';

export default function Header() {
	const { state } = useProgress();
	const currentStep = state.currentStep;

	return (
		<StyledHeaderContainer currentStep={ currentStep }>
			{ currentStep === 1
				? (
					<HeaderWithPlan
						currentStep={ currentStep }
						hasError={ !! state.error }
					/>
				) : (
					<HeaderWithNoPlan
						currentStep={ currentStep }
						hasError={ !! state.error }
					/>
				)
			}
		</StyledHeaderContainer>
	);
}

export function HeaderWithPlan( { currentStep, hasError } ) {
	const isSmall = useViewportMatch( 'medium', '<' );
	const isLarge = useViewportMatch( 'large', '>=' );

	const buttonText = __( 'Get Solid Backups - NextGen', 'codeSamplePlugin' );
	const buttonLink = 'https://go.solidwp.com/get-backups-nextgen';

	return (
		<StyledButtonHeader as="header">
			{ ! isSmall && (
				<StyledLogo />
			) }

			{ isLarge && (
				<ProgressIndicator currentStep={ currentStep } hasError={ hasError } />
			) }

			<StyledActions>
				<Button href={ buttonLink } target="_blank" text={ buttonText } variant="tertiaryAccent" />

				{ ! isSmall && (
					<StyledButtonDivider size={ TextSize.HUGE } text="&#124;" />
				) }

				<StyledCloseButton href={ getAdminUrl( 'index.php' ) } icon={ close } />
			</StyledActions>

			{ ! isLarge && (
				<ProgressIndicator currentStep={ currentStep } hasError={ hasError } />
			) }

		</StyledButtonHeader>
	);
}

export function HeaderWithNoPlan( { currentStep, hasError } ) {
	const isLarge = useViewportMatch( 'large', '>=' );

	return (
		<StyledConnectingHeader as="header">
			<StyledLogo />

			{ isLarge && (
				<ProgressIndicator currentStep={ currentStep } hasError={ hasError } />
			) }

			<StyledCloseButton href={ getAdminUrl( 'index.php' ) } icon={ close } />

			{ ! isLarge && (
				<ProgressIndicator currentStep={ currentStep } hasError={ hasError } />
			) }
		</StyledConnectingHeader>
	);
}
