import { SVG, Rect, Path } from '@wordpress/primitives';

export default function Calendar( props ) {
	return (
		<SVG { ...props } width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
			<Rect width="40" height="40" rx="8" fill="#F0E8F9" />
			<Path d="M12.152 10.69h16.385c.808 0 1.463.654 1.463 1.462v16.385c0 .808-.655 1.463-1.463 1.463H12.152a1.463 1.463 0 0 1-1.462-1.463V12.152c0-.808.654-1.462 1.462-1.462z" stroke="#1E1E1E" strokeWidth="2" />
			<Path
				d="M10 12.299C10 11.029 11.03 10 12.299 10H28.39c1.27 0 2.299 1.03 2.299 2.299v2.299H10v-2.3zM16.896 18.045h-2.298v2.299h2.298v-2.3zM16.896 22.645h-2.298v2.298h2.298v-2.299zM21.494 18.045h-2.299v2.299h2.3v-2.3zM26.092 18.045h-2.299v2.299h2.299v-2.3zM21.494 22.645h-2.299v2.298h2.3v-2.299zM26.092 22.645h-2.299v2.298h2.299v-2.299z"
				fill="#1E1E1E" />
		</SVG>
	);
}
