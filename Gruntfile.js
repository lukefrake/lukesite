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
				files: 'src/pages/*',
				tasks: ['staticHandlebars', 'notify:template'],
			},
			options: {
				livereload: true,
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
				files: [
					{ src: '*.html', dest: 'dist/css/styles.min.css'}
				]
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

		staticHandlebars: {
			options: {
		    assets:{
	        filesRoot:'src/', //optional
	        partialExtension: 'html', //optional
		    },
		    json: '{}', //optional
		    sourceView:true //optional
			},
			pages: {
        // Target-specific file lists and/or options go here.
        options:{
          json:''
        },
				files:{'dist/index.html':'src/pages/index.hbt'}
   		},
	    complexTarget: {
        options:{
          assets:{
        	  json:''
          }
        },
        files:{'dist/html/*.html':'src/pages/*.hbt'}
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