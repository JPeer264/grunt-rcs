'use strict';

const rcs = require('rcs-core');

rcs.nameGenerator.setAlphabet('#abcdefghijklmnopqrstuvwxyz');
rcs.nameGenerator.reset();

module.exports = function (grunt) {
    grunt.initConfig({
        paths: {
            testfiles: './test/files',
            results: '<%= paths.testfiles %>/results',
            fixtures: '<%= paths.testfiles %>/fixtures',
            cache: '<%= paths.testfiles %>/cache'
        },

        files: {
            config: '<%= paths.testfiles %>/config.json'
        },

        rcs: {
            options: {
                config: '<%= files.config %>'
            },
            css: {
                options: {
                    replaceCss: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= paths.fixtures %>',
                    src: '**/*.css',
                    dest: '<%= paths.cache %>',
                }]
            },
            cssconfig: {
                options: {
                    replaceCss: true,
                    config: '',
                    exclude: [
                        'js',
                        'no-js'
                    ]
                },
                files: [{
                    src: '<%= paths.fixtures %>/style.css',
                    dest: '<%= paths.cache %>/style-with-exclude.css'
                }]
            },
            all: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.fixtures %>',
                    src: ['**/*.txt', '**/*.html'],
                    dest: '<%= paths.cache %>',
                }]
            }
        }
    });

    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['rcs:css', 'rcs:all', 'rcs:cssconfig']);
};
