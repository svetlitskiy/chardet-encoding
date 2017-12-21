module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    encoding: {
      'utf8': {
        encoding: ['UTF-8'],
        src: [
          'utf8-test/**/*.*'
        ]
      },
      'win1251': {
        encoding: ['windows-1251'],
        src: [
          'win1251-test/**/*.*',
          '!**/*.sql'
        ]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-chardet-encoding');

  // Default task(s).
  grunt.registerTask('default', ['encoding']);

};