module.exports = function(grunt) {

	grunt.initConfig({

	  connect: {
	    server: {
	      options: {
	      	port: '8888',
				  target: 'http://localhost:8888', // target url to open
				  appName: 'Google Chrome', // name of the app that opens, ie: open, start, xdg-open
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
				tasks: ['sass', 'cssmin', 'uncss', 'sizediff', 'notify:main'],
			},
			options: {
				livereload: true,
			},
		},

		notify: {
			main: {
				options: {
					title: 'Woah there!',
					message: 'Just compiled sass, smushed CSS, removed unused CSS, compaired the size against the server and now I am telling you about it!',
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
		}

	});	
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-sizediff');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.registerTask('default', ['connect', 'watch']);

};