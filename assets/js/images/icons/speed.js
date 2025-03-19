import { SVG, Rect, Path } from '@wordpress/primitives';

export default function Speed( props ) {
	return (
		<SVG { ...props } width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
			<Rect x=".667" width="40" height="40" rx="8" fill="#F0E8F9" />
			<Path d="M20.52 11C14.159 11 9 16.158 9 22.52c0 2.403.736 4.634 1.995 6.48h19.052a11.466 11.466 0 0 0 1.994-6.48c0-6.362-5.158-11.52-11.52-11.52z" stroke="#1E1E1E" strokeWidth="2" />
			<Path d="m20.522 25.444 5.04-8.73M13.855 20.764l-.624-.36M16.427 17.338l-.36-.623M20.522 15.679v-.72" stroke="#000" strokeWidth="2" strokeLinecap="round" />
		</SVG>
	);
}
