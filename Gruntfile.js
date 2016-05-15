/*
 * grunt-encoding
 * https://github.com/pigulla/grunt-encoding
 *
 * Copyright (c) 2013-2014 Raphael Pigulla <pigulla@four66.com>
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    grunt.initConfig({

        // Example configuration
        encoding: {
            utf8: {
                encoding: ['UTF-8', 'ascii'],
                src: ['test/files/*']
            }
        }
    });

    grunt.loadTasks('tasks');

};
