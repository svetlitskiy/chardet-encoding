/*
 * grunt-encoding
 * https://github.com/pigulla/grunt-encoding
 *
 * Copyright (c) 2013-2015 Raphael Pigulla <pigulla@four66.com>
 * Licensed under the MIT license.
 */
'use strict';

var
    fs = require('fs'),
    jschardet = require('jschardet');

module.exports = function (grunt) {

    grunt.registerMultiTask('encoding', 'check encoding task', function() {
        var files = grunt.file.expand(this.data.src);
        if (this.data.exclude) {
            grunt.file.expand(this.data.exclude).forEach(function(e) {
                files.splice(files.indexOf(e), 1);
            });
        }
        var encoding = this.data.encoding;

        files.forEach(function(file) {
            if (grunt.file.isFile(file)) {
                checkFileEncoding(file, encoding);
            }
        });

    });

    /**
     * Check file is one of encodings
     * @param {patch to file} patch - file patch
     * @param {Array} encodings - encodings
   */
    var checkFileEncoding = function(patch, encodings) {
        var text, encoding;
        text = fs.readFileSync(patch);
        encoding = jschardet.detect(text).encoding;
        grunt.log.write('the file ' + patch + ' was detected like ' + encoding + ' encoding \n');
        if (encodings.indexOf(encoding) === -1) {
            var msg = 'The encoding of file ' + patch + ' is "' + encoding + '", but it has to be in "' + encodings.join(',') + '"';
            grunt.fail.warn(msg);
        }
    };

};
