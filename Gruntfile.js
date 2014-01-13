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
				tasks: ['sass', 'notify:sass'],
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

	});	
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-notify');
	grunt.registerTask('default', ['watch']);

};