module.exports = function(grunt) {

	grunt.initConfig({
		sass: {                              // Task
			dist: {                            // Target
				options: {                       // Target options
					style: 'expanded',
					cacheLocation: 'styles/.sass-cache'
				},
				files: {                         // Dictionary of files
					'styles/styles.css': 'styles/styles.scss',       // 'destination': 'source'
				}
			}
		},

		watch: {
			css: {
				files: 'styles/*.scss',
				tasks: ['sass', 'notify:sass', 'cssmin'],
			},
			options: {
				livereload: true,
			},
		},

		notify: {
			sass: {
				options: {
					title: 'Task Complete',  // optional
					message: 'Look... SASS has converted to CSS', //required
				}
			},
		},

		cssmin: {
			combine: {
				files: {
					'styles/styles.min.css': ['styles/styles.css']
				}
			}
		}

	});	
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('default', ['watch']);

};