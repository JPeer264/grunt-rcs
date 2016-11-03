'use strict';

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
                    cwd: '<%= paths.results %>',
                    src: '**/*.css',
                    dest: '<%= paths.cache %>',
                }]
            },
            all: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.results %>',
                    src: ['**/*.js', '**/*.html'],
                    dest: '<%= paths.cache %>',
                }]
            }
        }
    });

    grunt.loadTasks('tasks');

    grunt.registerTask('default', 'rcs:css', 'rcs:all');
};
