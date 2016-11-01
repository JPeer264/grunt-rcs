'use strict';

module.exports = grunt => {
    var rcs = require('rename-css-selectors');
    var async = require('async');

    grunt.registerMultiTask('rcs', 'Rename CSS selectors.', () => {
        // set options
        //      processCss: Boolean
        //      config: String
        //      except: Array | String
        // todo async process and processCss
    });
};