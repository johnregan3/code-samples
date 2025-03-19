import { __ } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import {
	Button,
	Heading,
	Text,
	TextVariant,
	TextWeight,
} from '@proprietary/ui';
import {
	Calendar as Timeline,
	Central,
	Cloud,
	Pointer as Restore,
	Speed,
} from '../../../images';
import {
	StyledFeaturesSection,
	StyledFeatures,
	StyledFeature,
	StyledFeatureText,
	StyledPurchaseButton,
} from './styles';

export default function Features( { beginOnboarding } ) {
	return (
		<StyledFeaturesSection>
			<Heading level={ 2 } text={ __( 'With multiple WP Backup services, why Backups – NextGen?', 'codeSamplePlugin' ) } />
			<StyledFeatures>
				{ features.map( ( feature ) => (
					<Feature key={ feature.title } icon={ feature.icon } title={ feature.title } description={ feature.description } />
				) ) }
			</StyledFeatures>

			<StyledPurchaseButton
				href="https://proprietary.com/get-code-sample-plugin"
				target="_blank"
				variant="primary"
				text={ __( 'Get Code Sample Plugin', 'codeSamplePlugin' ) }
			/>

			<Text
				align="center"
				variant={ TextVariant.DARK }
				weight={ TextWeight.HEAVY }
				text={
					createInterpolateElement(
						__( 'Already purchased a plan? <a>Continue here</a>', 'codeSamplePlugin' ),
						{ a: <Button variant="link" onClick={ beginOnboarding } /> }
					)
				} />
		</StyledFeaturesSection>
	);
}

function Feature( { icon, title, description } ) {
	return (
		<StyledFeature>
			{ icon }
			<StyledFeatureText>
				<Text
					variant={ TextVariant.DARK }
					weight={ TextWeight.HEAVY }
					text={ title }
				/>
				<Text variant={ TextVariant.MUTED } text={ description } />
			</StyledFeatureText>
		</StyledFeature>
	);
}

const features = [
	{
		title: __( 'Cloud-first Approach', 'codeSamplePlugin' ),
		description: __( 'Backups are initiated from cloud servers.', 'codeSamplePlugin' ),
		icon: <Cloud />,
	},
	{
		title: __( 'Focus on Speed and Reliability', 'codeSamplePlugin' ),
		description: __( 'Server-based rather than a PHP-based backup.', 'codeSamplePlugin' ),
		icon: <Speed style={ { height: '40px', width: '40px' } } />,
	},
	{
		title: __( 'HUb Integration', 'codeSamplePlugin' ),
		description: __( 'UI is primarily located in Hub.', 'codeSamplePlugin' ),
		icon: <Central />,
	},
	{
		title: __( '1-Click Restore', 'codeSamplePlugin' ),
		description: __( 'Best-in-class usability.', 'codeSamplePlugin' ),
		icon: <Restore />,
	},
	{
		title: __( 'Activity Log', 'codeSamplePlugin' ),
		description: __( 'Includes a basic timeline activity log.', 'codeSamplePlugin' ),
		icon: <Timeline />,
	},
];
