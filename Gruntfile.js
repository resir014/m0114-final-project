module.exports = function (grunt) {
  'use strict';

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // Project configuration
    pkg: grunt.file.readJSON('package.json'),

    // Clean up CSS
    csscomb: {
      options: {
        config: '.csscomb.json'
      },
      build: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['css/main.css'],
          dest: 'src/'
        }]
      }
    },

    // Handle vendor prefixing
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: ['last 2 versions', 'ie 8', 'ie 9']})
        ]
      },
      build: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['css/main.css'],
          dest: 'src/'
        }]
      }
    },

    // Optimise/minify images
    imagemin: {
      build: {
        options: {
          optimizationLevel: 3,
          progressive: true,
          interlaced: true,
          svgoPlugins: [{removeViewBox: false}]
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: ['img/**/*.{png,jpg,gif}'],
          dest: 'src'
        }]
      }
    },

    // Builds a complete site to the `dist` folder
    jekyll: {
      serve: {
        options: {
          bundleExec: true,
          serve: true,
          config: '_config.yml',
          src: 'src',
          dest: '_site'
        }
      }
    },

    // Lint JS files using XO
    xo: {
      options: {
        quiet: true
      },
      source: ['src/**/*.js'],
      gruntfile: ['Gruntfile.js']
    }

  });

  // test task
  grunt.registerTask('test', ['xo']);

  // jekyll task
  grunt.registerTask('serve', 'jekyll:serve');

  // default task
  grunt.registerTask('default', ['postcss', 'imagemin', 'csscomb']);
};
