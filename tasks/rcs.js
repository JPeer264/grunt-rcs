'use strict';

module.exports = grunt => {
    const rcs   = require('rcs-core');
    const fs    = require('fs');
    const async = require('async');
    const chalk = require('chalk');
    const json  = require('json-extra');
    const path  = require('path');

    grunt.registerMultiTask('rcs', 'Rename CSS selectors.', function() {
        const done = this.async();
        const options = this.options({
            exclude: '',
            replaceCss: false,
            config: undefined
        });

        let configPath;
        let configObject;

        if (options.config) {
            configPath   = options.config || path.join(process.cwd(), '.rcsrc');
            configObject = json.readToObjSync(configPath);

            if (!configObject) {
                configObject = json.readToObjSync(path.join(process.cwd(), 'package.json')).rcs;
            }

            if (configObject) {
                options.exclude = configObject.exclude || options.exclude;
            }
        }

        // set excluding selectors
        rcs.selectorLibrary.setExclude(options.exclude);

        this.files.forEach(f => {
            let src = f.src.filter(filepath => {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');

                    return false;
                }

                return true;
            });

            async.map(src, (pathString, cb) => {
                grunt.verbose.write('Start compiling ' + pathString);

                if (options.replaceCss) {
                    fs.readFile(pathString, 'utf8', (err, data) => {
                        if (err) {
                            grunt.verbose.write('Error occured in ' + pathString);

                            return cb(err);
                        }

                        rcs.fillLibraries(data);
                        const code = rcs.replace.css(data);

                        return cb(null, code);
                    });
                } else {
                    fs.readFile(pathString, 'utf8', (err, data) => {
                        if (err) {
                            grunt.verbose.write('Error occured in ' + pathString);

                            return cb(err);
                        }

                        const code = rcs.replace.any(data);

                        return cb(null, code);
                    });
                }

            }, (err, results) => {
                if (err) {
                    grunt.verbose.write(err);
                }

                for (let result of results) {
                    grunt.verbose.write('Start writing ' + result);
                    grunt.verbose.write('Into following directory: ' + f.dest);
                    grunt.file.write(f.dest, result);

                    // Print a success message.
                    grunt.verbose.write('File ' + chalk.cyan(f.dest) + ' created.\n');
                }

                done();
            });
        });
    });
};
