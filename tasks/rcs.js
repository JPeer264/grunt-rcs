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
                    grunt.log.warn('Source file "' + chalk.cyan(filepath) + '" not found.\n');

                    return false;
                }

                grunt.log.write('File found: ' + chalk.cyan(filepath) + '\n')

                return true;
            });

            async.map(src, (pathString, cb) => {
                fs.readFile(pathString, 'utf8', (err, data) => {
                    if (err) {
                        grunt.verbose.warn('Error occured in ' + chalk.cyan(pathString) + '\n');

                        return cb(err);
                    }

                    grunt.verbose.write('Start compiling ' + chalk.cyan(pathString), '\n');

                    let code;

                    if (options.replaceCss) {
                        rcs.fillLibraries(data);
                        code = rcs.replace.css(data);
                    } else {
                        code = rcs.replace.any(data);
                    }

                    grunt.verbose.write('Successfully compiled ' + chalk.cyan(pathString), '\n');

                    return cb(null, code);
                });
            }, (err, results) => {
                if (err) {
                    grunt.verbose.error('Error in file', f.dest + '\n');
                    grunt.verbose.error(err + '\n');
                }

                for (let result of results) {
                    grunt.verbose.write('Start write into following directory: ' + chalk.cyan(f.dest) + '\n');
                    grunt.file.write(f.dest, result);

                    // Print a success message.
                    grunt.verbose.write('File ' + chalk.cyan(f.dest) + ' created.\n');
                }

                done();
            });
        });
    });
};
