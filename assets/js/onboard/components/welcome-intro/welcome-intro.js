import { __ } from '@wordpress/i18n';
import { check } from '@wordpress/icons';
import { useViewportMatch } from '@wordpress/compose';
import { createInterpolateElement } from '@wordpress/element';

import {
	Button,
	Heading,
	List,
	ListItem,
	SurfaceVariant,
	Text,
	TextSize,
	TextVariant,
	TextWeight,
} from '@proprietary/ui';

import {
	StyledIntro,
	StyledContinueText,
	StyledOuterTextContainer,
	StyledInnerTextContainer,
	StyledBackupsIcon,
	StyledPricingSurface,
	StyledWhiteLogo,
	StyledPrice,
} from './styles';

export default function WelcomeIntro( { beginOnboarding } ) {
	const isSmall = useViewportMatch( 'small', '<' );
	const isLarge = useViewportMatch( 'large', '>=' );

	return (
		<>
			{ ! isSmall && (
				<StyledContinueText
					variant={ TextVariant.DARK }
					weight={ TextWeight.HEAVY }
					text={
						createInterpolateElement(
							__( 'Already purchased a plan? <a>Continue here</a>', 'codeSamplePlugin' ),
							{ a: <Button variant="link" onClick={ beginOnboarding } /> }
						)
					} />
			) }
			<StyledIntro>
				<StyledOuterTextContainer>
					<StyledInnerTextContainer>
						<StyledBackupsIcon />
						<Heading
							level={ 2 }
							size={ isLarge ? TextSize.GIGANTIC : TextSize.HUGE }
							variant={ TextVariant.DARK }
							text={ __(
								'Welcome! The premier Backups tool for all things WordPress.',
								'codeSamplePlugin'
							) }
						/>
						<Text
							size={ TextSize.SUBTITLE_SMALL }
							variant={ TextVariant.MUTED }
							weight={ TextWeight.HEAVY }
							text={ __(
								'Code Sample Plugin integrates seamlessly with the Proprietary Hub ecosystem and makes backups a simple and convenient occurrence. Sample Plugin is:',
								'codeSamplePlugin'
							) }
						/>
					</StyledInnerTextContainer>
					<List>
						<ListItem
							icon={ check }
							textVariant={ TextVariant.MUTED }
							text={ __( 'Performant', 'codeSamplePlugin' ) }
						/>
						<ListItem
							icon={ check }
							textVariant={ TextVariant.MUTED }
							text={ __( 'Easy-to-use', 'codeSamplePlugin' ) }
						/>
						<ListItem
							icon={ check }
							textVariant={ TextVariant.MUTED }
							text={ __( 'Smart', 'codeSamplePlugin' ) }
						/>
						<ListItem
							icon={ check }
							textVariant={ TextVariant.MUTED }
							text={ __( 'Reliable', 'codeSamplePlugin' ) }
						/>
					</List>

					<Button
						href="https://proprietary.com/get-code-sample-plugin"
						target="_blank"
						variant="primary"
						text={ __( 'Get Code Sample Plugin', 'codeSamplePlugin' ) }
					/>

					<Text
						variant={ TextVariant.DARK }
						weight={ TextWeight.HEAVY }
						text={
							createInterpolateElement(
								__( 'Already purchased a plan? <a>Continue here</a>', 'codeSamplePlugin' ),
								{ a: <Button variant="link" onClick={ beginOnboarding } /> }
							)
						} />
				</StyledOuterTextContainer>

				<StyledPricingSurface variant={ SurfaceVariant.DARK }>
					<StyledWhiteLogo />
					<StyledPrice
						size={ TextSize.GIGANTIC }
						variant={ TextVariant.WHITE }
						text={ createInterpolateElement(
							__( '$8.25 <span>/ month</span>', 'codeSamplePlugin' ),
							{
								span: (
									<Text
										size={ TextSize.LARGE }
										variant={ TextVariant.WHITE }
									/>
								),
							}
						) }
					/>
				</StyledPricingSurface>
			</StyledIntro>
		</>
	);
}
