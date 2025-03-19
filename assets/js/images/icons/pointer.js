import { SVG, Rect, Path } from '@wordpress/primitives';

export default function Pointer( props ) {
	return (
		<SVG { ...props } width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
			<Rect width="40" height="40" rx="8" fill="#F0E8F9" />
			<Path
				d="m21.91 32-3.734-14.813 12.938 7.97c-.253.04-.517.086-.787.136a22.3 22.3 0 0 0-2.673.647c-.844.27-1.687.624-2.29 1.104-.58.462-1.142 1.159-1.643 1.886-.511.739-.998 1.566-1.416 2.331-.14.254-.271.502-.395.74z"
				stroke="#1E1E1E" strokeWidth="2" />
			<Path d="M20.332 13.414 21.576 8M15.813 14.327l-3.192-4.546M13.541 18.305 8 17.922" stroke="#000" strokeWidth="1.5" />
		</SVG>
	);
}
