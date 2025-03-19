import { SVG, Circle, Path } from '@wordpress/primitives';

export default function BackupsIcon( props ) {
	return (
		<SVG { ...props } width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
			<Circle cx="16" cy="16" r="16" fill="#6817C5" />
			<g clipPath="url(#tcberok5ra)">
				<Path fillRule="evenodd" clipRule="evenodd"
					d="M16.005 8.01c-5.092 0-8.645 1.52-8.645 2.877 0 1.356 3.553 2.86 8.645 2.86s8.635-1.504 8.635-2.86c0-1.357-3.543-2.876-8.635-2.876zm8.635 4.57c-1.648 1.365-5.216 2.093-8.635 2.093-3.418 0-6.997-.728-8.645-2.092V16c.002 1.356 3.555 2.861 8.645 2.861 5.092 0 8.635-1.505 8.635-2.862v-3.42zm-8.635 7.208c3.419 0 6.987-.73 8.635-2.093v3.42c0 1.356-3.543 2.863-8.635 2.863-5.09 0-8.643-1.508-8.645-2.864v-3.42c1.648 1.364 5.227 2.094 8.645 2.094z"
					fill="#FBF9FF" />
				<g filter="url(#xmorwkk41b)">
					<Circle cx="22.24" cy="15.68" r=".64" fill="#D9D9D9" />
				</g>
				<Circle cx="9.12" cy="20.8" fill="#6817C5" r=".64" />
				<g filter="url(#k93t3awumc)">
					<Circle cx="22.24" cy="20.96" fill="#D9D9D9" r=".64" />
				</g>
			</g>
			<mask id="khdybfhcee" maskUnits="userSpaceOnUse" x="7" y="8" width="18" height="16">
				<g clipPath="url(#a7zrcl7ood)">
					<Path fillRule="evenodd" clipRule="evenodd"
						d="M16.005 8.01c-5.092 0-8.645 1.52-8.645 2.877 0 1.356 3.553 2.86 8.645 2.86s8.635-1.504 8.635-2.86c0-1.357-3.543-2.876-8.635-2.876zm8.635 4.57c-1.648 1.365-5.216 2.093-8.635 2.093-3.418 0-6.997-.728-8.645-2.092V16c.002 1.356 3.554 2.861 8.645 2.861 5.092 0 8.635-1.505 8.635-2.862v-3.42zm-8.635 7.208c3.419 0 6.987-.73 8.635-2.093v3.42c0 1.356-3.543 2.863-8.635 2.863-5.09 0-8.643-1.508-8.645-2.864v-3.42c1.648 1.364 5.227 2.094 8.645 2.094z"
						fill="#FBF9FF" />
					<Circle cx="22.24" cy="15.68" r=".64" fill="#6817C5" />
					<Circle cx="9.12" cy="20.8" fill="#6817C5" r=".64" />
					<Circle cx="22.24" cy="20.96" r=".64" fill="#6817C5" />
				</g>
			</mask>
			<g mask="url(#khdybfhcee)">
				<Path d="m7.12 24.64-.24-12.32 2.48.56c.48 3.36.944 4.96 3.68 7.84s5.44 4.16 5.44 4.16l-11.36-.24z" fill="#D9D9D9" />
			</g>
			<defs>
				<clipPath id="tcberok5ra">
					<path fill="#fff" transform="translate(7.36 8)" d="M0 0h17.28v16H0z" />
				</clipPath>
				<clipPath id="a7zrcl7ood">
					<path fill="#fff" transform="translate(7.36 8)" d="M0 0h17.28v16H0z" />
				</clipPath>
				<filter id="xmorwkk41b" x="21.6" y="15.04" width="1.28" height="3.28" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
					<feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
					<feOffset dy="2" />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix values="0 0 0 0 0.113725 0 0 0 0 0.0117647 0 0 0 0 0.235294 0 0 0 0.08 0" />
					<feBlend in2="shape" result="effect1_innerShadow_508_7435" />
				</filter>
				<filter id="k93t3awumc" x="21.6" y="20.32" width="1.28" height="3.28" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
					<feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
					<feOffset dy="2" />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix values="0 0 0 0 0.113725 0 0 0 0 0.0117647 0 0 0 0 0.235294 0 0 0 0.08 0" />
					<feBlend in2="shape" result="effect1_innerShadow_508_7435" />
				</filter>
			</defs>
		</SVG>

	);
}
