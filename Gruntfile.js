module.exports = function (grunt) {
    'use strict';

    var configBridge = {
        "config": {
            "autoprefixerBrowsers": [
                "Android 2.3",
                "Android >= 4",
                "Chrome >= 21",
                "Firefox >= 24",
                "Explorer >= 10",
                "iOS >= 6",
                "Opera >= 17",
                "Safari >= 6"
            ]
        }
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
            ' * Bootstrap Essentials v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under the <%= pkg.license %> license\n' +
            ' */\n',

        jshint: {
            files: ['js/*.js'],
            options: {
                jshintrc: 'js/.jshintrc'
            }
        },
        sass: { // Task
            dist: { // Target
                options: { // Target options
                    style: 'expanded'
                },
                files: { // Dictionary of files
                    'dist/css/<%= pkg.name %>.css': 'scss/<%= pkg.name %>.scss'
                }
            }
        },
        cssmin: {
            dist: {
                options: {
                    banner: '<%= banner %>'
                },
                files: {
                    'dist/css/<%= pkg.name %>.min.css': ['dist/css/<%= pkg.name %>.css']
                }
            },
            docs: {
                options: {
                    banner: '<%= banner %>'
                },
                files: {
                    'docs/assets/css/style.min.css': ['docs/assets/css/style.css']
                }
            }
        },
        csslint: {
            options: {
                csslintrc: 'scss/.csslintrc'
            },
            dist: ['dist/css/<%= pkg.name %>.css']
        },
        csscomb: {
            options: {
                config: 'scss/.csscomb.json'
            },
            dist: {
                expand: true,
                cwd: 'dist/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/css/'
            }
        },
        autoprefixer: {
            options: {
                browsers: configBridge.config.autoprefixerBrowsers
            },
            core: {
                options: {
                    map: true
                },
                src: 'dist/css/<%= pkg.name %>.css'
            }
        },
        concat: {
            bootstrap: {
                src: [
                    'js/slide.js',
                    'js/scrollto.js',
                    'js/offcanvas.js',
                    'js/fileinput.js'
                ],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },
        copy: {
            docs: {
                expand: true,
                cwd: 'dist/',
                src: [
                '**/*'
                ],
                dest: 'docs/dist/'
            }
        },
        uglify: {
            options: {
                compress: {
                    warnings: false
                },
                mangle: true,
                preserveComments: /^!|@preserve|@license|@cc_on/i
            },
            core: {
                src: '<%= concat.bootstrap.dest %>',
                dest: 'dist/js/<%= pkg.name %>.min.js'
            },
            docs: {
                src: 'docs/assets/js/style-switcher.js',
                dest: 'docs/assets/js/style-switcher.min.js'
            },
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-csscomb');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-autoprefixer');
    //'jshint',
    grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'concat', 'csscomb', 'csslint', 'uglify', 'copy']);

};