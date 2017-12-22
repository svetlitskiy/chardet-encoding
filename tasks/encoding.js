/*
 * grunt-chardet-encoding
 * https://github.com/pigulla/grunt-encoding
 *
 * Copyright (c) 2016 Aleksey Svetlitskiy <a.svetlitskiy@gmail.com>
 * Licensed under the MIT license.
 */
'use strict';

var
    fs = require('fs'),
    jschardet = require('jschardet');

module.exports = function (grunt) {
    grunt.registerMultiTask('encoding', 'check encoding task', function() {
        var files = grunt.file.expand(this.data.src), phMode = this.data.prohibitionMode || false;
        if (this.data.exclude) {
            grunt.file.expand(this.data.exclude).forEach(function(e) {
                files.splice(files.indexOf(e), 1);
            });
        }
        var encoding = this.data.encoding;

        var errorMessages = [];

        files.forEach(function(file) {
            if (grunt.file.isFile(file)) {
                var result = checkFileEncoding(file, encoding, phMode);

                if (result) {
                    errorMessages.push(result);
                }
            }
        });

        if (errorMessages.length > 0) {
          var errorMessage = errorMessages.join('');
          grunt.fail.warn('\n\nProblems: \n' + errorMessage);
        }
    });

    /**
     * Check file is one of encodings
     * @param {String} patch - file patch
     * @param {Array} encodings - encodings
     * @prohibitionMode {Boolean} - mode
   */
    var checkFileEncoding = function(patch, encodings, prohibitionMode) {
        var text, encoding, msg;
        text = fs.readFileSync(patch);
        encoding = jschardet.detect(text).encoding;
        grunt.log.write('the file ' + patch + ' was detected like ' + encoding + ' encoding \n');
        if (prohibitionMode === true) {
            if (encodings.indexOf(encoding) > -1) {
                msg = 'The file ' + patch + ' has the forbidden encoding "' + encoding + '" \n';
            }
        } else {
            if (encodings.indexOf(encoding) === -1) {
                var allowedEncodings = encodings.length > 1 ? encodings.join(',') : encodings[0];

                msg = 'The encoding of file ' + patch + ' is "' + encoding + '", but it has to be in [' + allowedEncodings + ']\n';
            }
        }

        return msg;
    };

};
