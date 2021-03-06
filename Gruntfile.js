module.exports = function(grunt) {

	// Configurable paths and globs
	var buildConfig = {
		srcStyles: 'src/styles/',
		srcPages: 'src/pages/',
		srcPartials: 'src/partials/',
		distStyles: 'dist/css/',
		distScripts: 'dist/js/',
		srcScripts: 'src/scripts/',
	};

	grunt.initConfig({
		buildConfig: buildConfig,

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
					cacheLocation: '<%= buildConfig.srcStyles  %>.sass-cache'
				},
				files: {
					'<%= buildConfig.distStyles  %>styles.min.css': '<%= buildConfig.srcStyles  %>styles.scss',
				}
			}
		},

		watch: {
			css: {
				files: '<%= buildConfig.srcStyles  %>*.scss',
				tasks: ['sass', 'uncss', 'cssmin', 'sizediff', 'notify:css', 'clean'],
			},
			imges: {
				files: '<%= buildConfig.srcStyles  %>/media/*',
				tasks: ['responsive_images'],
			},			
			// devcss: {
			// 	files: '<%= buildConfig.srcStyles  %>*.scss',
			// 	tasks: ['sass', 'cssmin'],
			// },			
			pages: {
				files: ['<%= buildConfig.srcPages  %>*.hbt', '<%= buildConfig.srcPartials  %>*.partial', '<%= buildConfig.srcPages  %>*.json'],
				tasks: ['staticHandlebars:pages', 'clean', 'notify:template'],
			},
			scripts: {
				files: ['<%= buildConfig.srcScripts  %>*.js'],
				tasks: ['uglify'],
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
				json: '<%= buildConfig.srcPages  %>default.json',
				sourceView:true
			},
			pages: {
				files:{'dist/*.html':'<%= buildConfig.srcPages  %>*.hbt'}
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
			options: {
				ignore: ['.caption', '.workContainer', '.ybrImage', '.pauImage']
			},
			dist: {
				files: {
					'<%= buildConfig.distStyles  %>styles.min.css': ['dist/index.html']
				}
			}
		},

		cssmin: {
			combine: {
				files: {
					'<%= buildConfig.distStyles  %>styles.min.css': ['<%= buildConfig.distStyles  %>styles.min.css']
				}
			}
		},

		sizediff: {
			dist: {
				src: ['<%= buildConfig.distStyles  %>styles.css', '<%= buildConfig.distStyles  %>styles.min.css']
			}
		},

		uglify: {
			my_target: {
				files: {
					'<%= buildConfig.distScripts  %>main.min.js': ['<%= buildConfig.srcScripts  %>main.js']
				}
			}
		},

		responsive_images: {
			myTask: {
				options: {
					engine: 'im',
					sizes: [ {
						name: 'small',
						width: 340,
						height: 500,
						aspectRatio: false,
						quality: 70
					}, {
						name: 'medium',
						width: 640,
						quality: 70
					}, {
						name: "large",
						width: 1024,
						quality: 70
					} ]
				},
				files: [ {
					expand: true,
					src: ['**.{jpg,jpeg,gif,png}'],
					dest: 'dist/media/',
					cwd: 'src/media'
				} ]
			},
			workTask: {
				options: {
					engine: 'im',
					sizes: [ {
						name: 'small',
						width: 340,
						quality: 70
					}, {
						name: 'medium',
						width: 500,
						quality: 70
					} ]
				},
				files: [ {
					expand: true,
					src: ['**.{jpg,jpeg,gif,png}'],
					dest: 'dist/media/',
					cwd: 'src/media/work'
				} ]
			}		
		},

		clean: ['src/index.html', 'src/js-dev/', 'index.html', '<%= buildConfig.srcStyles  %>.sass-cache'],

	});	
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-sizediff');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-static-handlebars');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.registerTask('default', ['connect', 'watch']);
	grunt.registerTask('images', ['responsive_images']);

};