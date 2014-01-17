module.exports = function(grunt) {

	grunt.initConfig({

		connect: {
			server: {
				options: {
					port: '8888',
					target: 'http://localhost:8888',
					appName: 'Google Chrome',
					base: 'dist/',
				}
			}
		},

		sass: {
			dist: {
				options: {
					style: 'expanded',
					cacheLocation: 'src/styles/.sass-cache'
				},
				files: {
					'dist/css/styles.css': 'src/styles/styles.scss',
				}
			}
		},

		watch: {
			css: {
				files: 'src/styles/*.scss',
				tasks: ['sass', 'cssmin', 'uncss', 'sizediff', 'notify:css'],
			},
			pages: {
				files: ['src/pages/*.hbt', 'src/partials/*.partial', 'src/pages/*.json'],
				tasks: ['staticHandlebars:pages', 'notify:template'],
			},
			options: {
				livereload: true,
			},
		},

		staticHandlebars: {
			options: {
				assets:{
					filesRoot:'src/',
					partialExtension: 'partial',
				},
				json: 'src/pages/default.json',
				sourceView:true
			},
			pages: {
				files:{'dist/*.html':'src/pages/*.hbt'}
			},
		},

		notify: {
			css: {
				options: {
					title: 'Woah there!',
					message: 'SASS is now CSS',
				}
			},
			template: {
				options: {
					title: 'Woah there!',
					message: 'Templates updated',
				}
			},			
		},

		uncss: {
			dist: {
				files: {
					'dist/css/styles.min.css': ['dist/index.html','dist/**/*.html'],
				}
			}
		},

		cssmin: {
			combine: {
				files: {
					'dist/css/styles.min.css': ['dist/css/styles.css']
				}
			}
		},

		sizediff: {
			dist: {
				src: ['dist/css/styles.css', 'dist/css/styles.min.css']
			}
		},

	});	
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-sizediff');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-static-handlebars');
	grunt.registerTask('default', ['connect', 'watch']);

};