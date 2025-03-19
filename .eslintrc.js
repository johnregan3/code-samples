module.exports = {
	root: true,
	parser: '@babel/eslint-parser',
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended-with-formatting' ],
	settings: {
		jsdoc: {
			mode: 'typescript',
		},
	},
	rules: {
		'@wordpress/i18n-text-domain': [
			'error',
			{
				allowedTextDomain: [ 'codeSamplePlugin' ],
			},
		],
	},
};
