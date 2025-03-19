const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
module.exports = {
	...defaultConfig,
	resolve: {
		modules: [ path.resolve( './node_modules' ) ],
		alias: {
			// Always load the same copy of @emotion/react to prevent issues with npm linking our UI library.
			'@emotion/react': path.resolve( './node_modules/@emotion/react' ),
		},
	},
};
