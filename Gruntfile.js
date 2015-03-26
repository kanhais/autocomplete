
module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.initConfig({
    clean: {
        build: ['client/dist']
    },
    express: {
      options: {
        port: 9000
      },
      dev: {
        options: {
          script: 'server/app.js',
          debug: true
        }
      },
      prod: {
        options: {
          script: 'dist/server/app.js'
        }
      }
    },
	watch: {
	  js: {
        files: [
          'client/app/**/*.js',
		  'client/app/**/*.html'
        ],
        tasks: ['clean', 'concat'],  
		options: {
		  livereload: true,
		}
	  }
	},
	jshint: {
		files: 'client/app/**/*.js'
	},
	concat: {
		thirdParty: {
		  src: ['client/bower_components/jquery/dist/jquery.min.js',
			'client/bower_components/angular/angular.min.js',
			'client/bower_components/angular-route/angular-route.min.js',
		        'client/bower_components/lodash/lodash.min.js',
		        'client/bower_components/contentEditable.js',
		        'client/bower_components/ng-sortable.js',
		        'client/bower_components/ng-tags-input/ng-tags-input.js',
		        'client/bower_components/bootstrap/dist/js/bootstrap.min.js',
			'client/bower_components/flip/dist/jquery.flip.min.js',
			'client/bower_components/angular-flippy-master/js/src/flippy-directive.js'],
		  dest: 'client/dist/components.js',
		},
		js: {
		  src: ['client/app/src/**/*.js'],
		  dest: 'client/dist/nodeApp.js'
		}
    }
  });

 
  grunt.registerTask('default', [
    'clean',
    'concat', 
    'express:dev',
	'watch'
  ]);
};
