'use strict';

module.exports = grunt => {
    const rcs   = require('rcs-core');
    const fs    = require('fs');
    const async = require('async');
    const chalk = require('chalk');

    grunt.registerMultiTask('rcs', 'Rename CSS selectors.', function() {
        const done = this.async();
        const options = this.options();

        // todo set options
        //      processCss: Boolean
        //      config: String
        //      except: Array | String

        this.files.forEach(f => {

            let srcArray = [];
            let src = f.src.filter(filepath => {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');

                    return false;
                }

                return true;
            });

            async.map(src, (pathString, cb) => {

                if (options.replaceCss) {
                    rcs.replace.fileCss(pathString, (err, data) => {
                        if (err) cb(err);

                        cb(null, data);
                    });
                } else {
                    rcs.replace.file(pathString, (err, data) => {
                        if (err) cb(err);

                        cb(null, data);
                    });
                }

            }, (err, results) => {

                for (let result of results) {
                    grunt.file.write(f.dest, result.data);

                    // Print a success message.
                    grunt.verbose.write('File ' + chalk.cyan(f.dest) + ' created.\n');
                }

                done();
            });
        });
    });
};
