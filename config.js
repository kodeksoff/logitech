let config = { 
	'dir': {
		'src': {
			'html': 'src/',
			'scss': 'src/scss/',
			'js': 'src/js/',
			'img': 'src/img/',
			'fonts': 'src/fonts/'

		},
		'watch': {
			'html': 'src/',
			'scss': 'src/scss/',
			'js': 'src/js/',
			'img': 'src/img/',
			'fonts': 'src/fonts/'
		},
		'build': {
			'html': 'build/',
			'css': 'build/css/',
			'js': 'build/js/',
			'img': 'build/img/',
			'fonts': 'build/fonts/'
		},
	},

	'addStylesBefore': [
		'src/scss/variables.scss',
		'src/scss/mixins.scss'
	]
}
module.exports = config;