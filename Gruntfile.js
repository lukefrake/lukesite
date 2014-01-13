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
	  }
	});	
	
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.registerTask('default', ['sass']);

};