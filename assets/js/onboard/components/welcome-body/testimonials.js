import { __ } from '@wordpress/i18n';
import { useViewportMatch } from '@wordpress/compose';
import {
	Heading,
	Text,
	TextVariant,
	TextSize,
	TextWeight,
} from '@proprietary/ui';
import sueSpencer from '../../../images/sue-spencer.png';
import {
	StyledTestimonial,
	StyledTestimonials,
	StyledTextContainer,
	StyledTestimonialUser,
} from './styles';

export default function Testimonials() {
	return (
		<StyledTestimonials>
			<Heading
				align="center"
				level={ 2 }
				size={ TextSize.HUGE }
				text={ __( 'Testimonial', 'codeSamplePlugin' ) }
			/>
			<Testimonial
				quote={ __( '“Using JohnRegan3 products helps me make a difference in the success of others. I know I can count on them to deliver the results I want for my clients.”', 'codeSamplePlugin' ) }
				image={ sueSpencer }
				name={ __( 'Sally Smith', 'codeSamplePlugin' ) }
				business={ __( 'Founder at Smith Web Design', 'codeSamplePlugin' ) }
			/>
		</StyledTestimonials>
	);
}

function Testimonial( { quote, image, name, business } ) {
	const isLarge = useViewportMatch( 'large', '>=' );

	return (
		<StyledTestimonial>
			<StyledTextContainer>
				<Text
					size={ isLarge ? TextSize.HUGE : TextSize.EXTRA_LARGE }
					variant={ TextVariant.DARK }
					text={ quote }
				/>
				<StyledTestimonialUser>
					<Text
						size={ TextSize.HUGE }
						variant={ TextVariant.DARK }
						text={ name }
					/>
					<Text
						variant={ TextVariant.DARK } weight={ TextWeight.HEAVY } text={ business }
					/>
				</StyledTestimonialUser>
			</StyledTextContainer>
			<img src={ image } alt="" />
		</StyledTestimonial>
	);
}
