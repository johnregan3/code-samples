import { Heading, TextSize, TextVariant } from '@proprietary/ui';
import ArrowLink from './arrow-link';
import {
	StyledLinkRowBox,
	StyledLinkRowBoxLeft,
	StyledLinkRowBoxText,
} from './styles';

export default function LinkRowBox( { title, text, url, isDisconnected = false } ) {
	return (
		<StyledLinkRowBox useDisconnectedStyle={ isDisconnected } href={ url } title={ title }>
			<StyledLinkRowBoxLeft>
				<Heading
					level={ 3 }
					size={ TextSize.EXTRA_LARGE }
					text={ title }
				/>
				<StyledLinkRowBoxText
					size={ TextSize.NORMAL }
					variant={ TextVariant.MUTED }
					text={ text }
					gap={ 0.5 }
				/>
			</StyledLinkRowBoxLeft>
			<ArrowLink />
		</StyledLinkRowBox>
	);
}
