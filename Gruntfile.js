'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

var vendors = 'jquery backbone backbone.marionette handlebars'.split(' ');
// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'handlebars'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // show elapsed time at the end
    require('time-grunt')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: '',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        browserify: {
            dev: {
                files: {
                    'build/app.js': ['scripts/backbone/app.js']
                },
                options: {
                    extension: [".hbs"],
                    transform: ["hbsfy"],
                    debug: true,
                    external: vendors
                }
            },
            vendors: {
                files: {
                    "build/vendors.js": [ "scripts/backbone/radio_config.js"]
                },
                options: {
                    debug: true,
                    "require": ["jquery", "backbone","handlebars", "backbone.marionette"],
                    //transform: "scripts/backbone/main.js"

                }
            },
            bundle: {
                src: "src/app.js",
                dest: "dist/bundle.js",
                options: {
                    extensions: [".hb"],
                    transform: ["hbsfy"]
                }
            }
        },
        // watch list
        watch: {
            livereload: {
                files: [
                    'scripts/{,**/}*.js',
                    //'templates/{,**/}*.hbs',
                    //'test/spec/{,**/}*.js',
                ],
                tasks: ["browserify:dev"],
                options: {
                    livereload: true
                }
            }
            /* not used at the moment
            handlebars: {
                files: [
                    '<%= yeoman.app %>/templates/*.hbs'
                ],
                tasks: ['handlebars']
            }*/
        },
        // testing server
        connect: {
            testserver: {
                options: {
                    hostname: '0.0.0.0',
                    port: 1234,
                    base: '.'
                }
            }
        },
        // open app and test page
        open: {
            server: {
                path: 'http://localhost:<%= connect.testserver.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
        },

        // linting
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                        'bower_components/requirejs/require.js'
                    ]
                }]
            }
        },
        bower: {
            all: {
                rjsConfig: '<%= yeoman.app %>/scripts/main.js'
            }
        },
        // handlebars
        handlebars: {
            compile: {
                options: {
                    namespace: 'JST',
                    amd: true
                },
                files: {
                    '.tmp/scripts/templates.js': ['templates/**/*.hbs']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.registerTask('createDefaultTemplate', function () {
        grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('builddev', [
        'browserify:vendors',
        "browserify:dev"
    ]);

    grunt.registerTask('default', function (target) {
        // what is this??
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }
        grunt.option('force', true);
        grunt.task.run([
            'clean:server',
            'connect:testserver',
            "builddev",
            'open',
            'watch'
        ]);
    });
    // todo fix these
    grunt.registerTask('test', [
        'clean:server',
        'createDefaultTemplate',
        'handlebars',
        'compass',
        'connect:testserver',
        'exec:mocha'
    ]);
    grunt.registerTask('build', [
        'createDefaultTemplate',
        'handlebars',
        'compass:dist',
        'useminPrepare',
        'requirejs',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'usemin'
    ]);
};
