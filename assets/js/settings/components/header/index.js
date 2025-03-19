import { __ } from '@wordpress/i18n';
import { Text, TextVariant } from '@proprietary/ui';
import { StyledHeader, StyledVerticalFlex, StyledWhiteLogo } from './styles';

export default function Header() {
	return (
		<StyledHeader>
			<StyledVerticalFlex>
				<Text
					text={ __( 'Welcome to JohnRegan3’s newest Backups solution', 'codeSamplePlugin' ) }
					variant={ TextVariant.WHITE }
				/>
				<StyledWhiteLogo />
			</StyledVerticalFlex>
		</StyledHeader>
	);
}
