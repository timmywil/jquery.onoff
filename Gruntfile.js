'use strict';

module.exports = function (grunt) {
	// Load all grunt tasks
	require('load-grunt-tasks')(grunt);
	// Show elapsed time at the end
	require('time-grunt')(grunt);

	var _ = require('lodash');
	var fs = require('graceful-fs');

	// Project configuration
	grunt.initConfig({
		// Metadata
		pkg: grunt.file.readJSON('package.json'),
		banner: _.template('/** <%= pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed MIT */\n', {
				grunt: grunt,
				pkg: grunt.file.readJSON('package.json')
			}),
		// Task configuration
		autoprefixer: {
			onoff: {
				src: 'src/onoff.css',
				dest: 'dist/jquery.onoff.css'
			}
		},
		bowercopy: {
			options: {
				clean: true
			},
			test: {
				options: {
					destPrefix: 'test/libs'
				},
				files: {
					'jquery.js': 'jquery/jquery.js',
					'qunit': 'qunit/qunit',
					'require.js': 'requirejs/require.js'
				}
			},
			pointertouch: {
				src: 'jquery.event.pointertouch/dist/jquery.event.pointertouch.js',
				dest: 'src/pointertouch.js'
			}
		},
		clean: {
			files: ['dist']
		},
		build: {
			dist: {
				src: ['src/onoff.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		connect: {
			options: {
				hostname: '*'
			},
			server: {
				options: {
					port: 9001
				}
			},
			test: {
				options: {
					port: 9002
				}
			}
		},
		csslint: {
			options: {
				csslintrc: '.csslintrc'
			},
			dist: {
				src: 'dist/jquery.onoff.css'
			}
		},
		jshint: {
			gruntfile: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: 'Gruntfile.js'
			},
			src: {
				options: {
					jshintrc: 'src/.jshintrc'
				},
				src: ['src/**/*.js']
			},
			dist: {
				options: {
					jshintrc: 'src/.jshintrc'
				},
				src: ['dist/jquery.onoff.js']
			},
			test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: ['test/*.js']
			}
		},
		jsonlint: {
			all: {
				src: '{package,bower,onoff.jquery}.json'
			}
		},
		qunit: {
			all: {
				options: {
					urls: ['http://localhost:9002/test/index.html']
				}
			}
		},
		sass: {
			onoff: {
				options: {
					style: 'expanded'
				},
				src: 'src/onoff.scss',
				dest: 'src/onoff.css'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: '<%= build.dist.dest %>',
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			src: {
				files: '<%= jshint.src.src %>',
				tasks: ['jshint:src', 'build', 'connect:test', 'qunit']
			},
			test: {
				files: ['<%= jshint.test.src %>', 'test/index.html'],
				tasks: ['jshint:test', 'connect:test', 'qunit']
			},
			css: {
				files: 'src/onoff.scss',
				tasks: ['sass', 'autoprefixer', 'csslint']
			}
		},
		version: {
			manifest: {
				src: 'onoff.jquery.json'
			},
			bower: {
				src: 'bower.json'
			},
			readme: {
				src: 'README.md'
			}
		}
	});

	grunt.registerMultiTask(
		'build',
		'Build jquery.panzoom and package manifest',
		function() {
			var data = this.data;
			var src = data.src;
			var dest = data.dest || src;
			var compiled = grunt.file.read( src );

			var fixhook = fs.readFileSync(__dirname + '/src/pointertouch.js', 'utf8')
				.replace(/\/\*\*[\w\W]*'use strict';\s*/, '')
				.replace(/\s*return \w+;\s*\}\)\);\s*$/, '');
			compiled = grunt.config('banner') + compiled
				// Insert pointer/touch fixhook
				.replace( /\/\/ INSERT FIXHOOK/, fixhook );

			// Remove pointerhook dependency
			compiled = compiled
				.replace(', \'./pointertouch\'', '')
				.replace(', require(\'./pointertouch\')', '');

			// Write source to file
			grunt.file.write( dest, compiled );

			grunt.log.ok( 'File written to ' + dest );
		}
	);

	grunt.registerMultiTask(
		'version',
		'Update versions in package manifests and the README',
		function() {
			var data = this.data;
			var src = data.src;
			var dest = data.dest || src;
			var version = grunt.config('pkg.version');
			var compiled = grunt.file.read( src );

			// If this is the README, replace versions to download
			if ( /README/.test(src) ) {
				compiled = compiled
					// Replace versions in the URLs
					.replace( /(\/[\w\.]+\/)\d+\.\d+\.\d+(\/[\w\.]+\/)/g, '$1' + version + '$2' );
			} else {
				// Replace version and date
				compiled = compiled
					// Replace version in JSON files
					.replace( /("version":\s*")[^"]+/, '$1' + version )
					// Replace version tag
					.replace( /@VERSION/g, version )
					.replace( '@DATE', (new Date).toDateString() );
			}

			// Write source to file
			grunt.file.write( dest, compiled );

			grunt.log.ok( 'File written to ' + dest );
		}
	);

	// Default task
	grunt.registerTask('default', [
		'jsonlint',
		'clean',
		'sass',
		'autoprefixer',
		'csslint',
		'version',
		'build',
		'jshint',
		'uglify',
		'connect:test',
		'qunit'
	]);
	grunt.registerTask('server', ['connect:server', 'watch']);
	grunt.registerTask('test', ['jshint', 'connect:test', 'qunit']);
};
