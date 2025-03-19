import { __ } from '@wordpress/i18n';

import { TextVariant, TextWeight } from '@proprietary/ui';

import {
	StyledProgressIndicator,
	StyledStep,
	StyledInactiveStepNumber,
	StyledActiveStepNumber,
	StyledErrorStepNumber,
	StyledLabel,
	StyledDivider,
} from './styles';

export default function ProgressIndicator( { currentStep, hasError } ) {
	return (
		<StyledProgressIndicator>
			<Step
				currentStep={ currentStep }
				stepNumber={ 1 }
				label={ __( 'Purchase plan', 'codeSamplePlugin' ) }
				hasError={ hasError }
			/>
			<StyledDivider />
			<Step
				currentStep={ currentStep }
				stepNumber={ 2 }
				label={ __( 'Site connection', 'codeSamplePlugin' ) }
				hasError={ hasError }
			/>
			<StyledDivider />
			<Step
				currentStep={ currentStep }
				stepNumber={ 3 }
				label={ __( 'Hub login', 'codeSamplePlugin' ) }
				hasError={ hasError }
			/>
			{ currentStep !== 3 && (
				<StyledDivider />
			) }
		</StyledProgressIndicator>
	);
}

function Step( { currentStep, stepNumber, label, hasError } ) {
	const isCurrentStep = stepNumber === currentStep;

	if ( isCurrentStep ) {
		return (
			<StyledStep>
				{ hasError ? (
					<StyledErrorStepNumber
						text={ stepNumber }
						variant={ TextVariant.WHITE }
						weight={ TextWeight.HEAVY }
					/>
				) : (
					<StyledActiveStepNumber
						text={ stepNumber }
						variant={ TextVariant.WHITE }
						weight={ TextWeight.HEAVY }
					/>
				) }

				<StyledLabel
					hasError={ hasError }
					text={ label }
					weight={ TextWeight.HEAVY }
				/>
			</StyledStep>
		);
	}

	if ( ! isCurrentStep ) {
		return (
			<StyledInactiveStepNumber
				text={ stepNumber }
				variant={ TextVariant.WHITE }
				weight={ TextWeight.HEAVY }
			/>
		);
	}
}
