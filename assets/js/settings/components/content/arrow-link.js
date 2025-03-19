import { arrowRight, Icon } from '@wordpress/icons';
import { StyledArrowLink, StyledArrowLinkIcon } from './styles';

export default function ArrowLink() {
	return (
		<StyledArrowLink>
			<StyledArrowLinkIcon><Icon icon={ arrowRight } /></StyledArrowLinkIcon>
		</StyledArrowLink>
	);
}
