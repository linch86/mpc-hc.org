module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        dirs: {
            dest: "_site",
            src: "source"
        },

        // Copy files that don't need compilation to dist/
        copy: {
            dist: {
                files: [
                    {dest: "<%= dirs.dest %>/", src: "assets/js/jquery*.min.js", expand: true, cwd: "<%= dirs.src %>/"},
                ]
            }
        },

        jekyll: {
            site: {}
        },

        rev: {
            assets: {
                files: {
                    src: [
                        "<%= dirs.dest %>/assets/css/**/{,*/}*.css",
                        "<%= dirs.dest %>/assets/js/**/{,*/}*.js",
                        //"<%= dirs.dest %>/assets/img/**/*.{jpg,jpeg,gif,png}"
                    ]
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    /*removeComments: true,*/
                    collapseWhitespace: true
                },
                expand: true,
                cwd: "<%= dirs.dest %>",
                dest: "<%= dirs.dest %>",
                src: [
                    "**/*.html",
                    "!404.html"
                ]
            }
        },

        useminPrepare: {
            html: "<%= dirs.dest %>/index.html",
            options: {
                dest: "<%= dirs.dest %>",
                root: "<%= dirs.dest %>"
            }
        },

        usemin: {
            html: ["<%= dirs.dest %>/**/*.html"],
            options: {
                dirs: ["<%= dirs.dest %>/assets"]
            }
        },

        concat: {
            css: {
                src: ["<%= dirs.src %>/assets/css/bootstrap.css",
                      "<%= dirs.src %>/assets/css/font-awesome.css",
                      "<%= dirs.src %>/assets/css/jquery.fancybox.css",
                      "<%= dirs.src %>/assets/css/jquery.fancybox-thumbs.css",
                      "<%= dirs.src %>/assets/css/style.css"],
                dest: "<%= dirs.dest %>/assets/css/pack.css"
            },
            js: {
                src: ["<%= dirs.src %>/assets/js/plugins.js",
                      "<%= dirs.src %>/assets/js/bootstrap.js",
                      "<%= dirs.src %>/assets/js/jquery.mousewheel.js",
                      "<%= dirs.src %>/assets/js/jquery.fancybox.js",
                      "<%= dirs.src %>/assets/js/jquery.fancybox-thumbs.js"],
                dest: "<%= dirs.dest %>/assets/js/pack.js"
            },
            jsIE: {
                src: ["<%= dirs.src %>/assets/js/html5shiv.js",
                      "<%= dirs.src %>/assets/js/respond.js"],
                dest: "<%= dirs.dest %>/assets/js/html5shiv-respond.min.js"
            }
        },

        uncss: {
            options: {
                ignore: [
                    /(#|\.)fancybox(\-[a-zA-Z]+)?/,
                    // needed for Bootstrap's transitions
                    ".fade",
                    ".fade.in",
                    ".collapse",
                    ".collapse.in",
                    ".collapsing",
                    // needed for the <noscript> warning; remove when fixed in uncss
                    ".alert-danger",
                    ".visible-xs",
                    ".noscript-warning"
                ],
                htmlroot: "<%= dirs.dest %>",
                ignoreSheets: [/fonts.googleapis/]
            },
            dist: {
                src: "<%= dirs.dest %>/**/*.html",
                dest: "<%= concat.css.dest %>"
            }
        },

        cssmin: {
            options: {
                keepSpecialComments: 0,
                report: "min",
                selectorsMergeMode: "ie8"
            }
        },

        uglify: {
            options: {
                /*compress: true,*/     //this is enabled by default; commented out so that the warnings don't show up
                mangle: true,
                preserveComments: false,
                report: "min"
            },
            minify: {
                files: {
                    "<%= concat.js.dest %>": "<%= concat.js.dest %>"
                }
            },
            minifyIE: {
                files: {
                    "<%= concat.jsIE.dest %>": "<%= concat.jsIE.dest %>"
                }
            }
        },

        connect: {
            server: {
                options: {
                    base: "<%= dirs.dest %>/",
                    port: 8000
                }
            }
        },

        watch: {
            files: ["<%= dirs.src %>/**/*", ".jshintrc", "_config.yml", "Gruntfile.js"],
            tasks: "dev",
            options: {
                livereload: true
            }
        },

        csslint: {
            src: "<%= dirs.src %>/assets/css/style.css"
        },

        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            files: {
                src: "Gruntfile.js"
            }
        },

        validation: {
            options: {
                charset: "utf-8",
                doctype: "HTML5",
                reset: true
            },
            files: {
                src: "<%= dirs.dest %>/**/*.html"
            }
        },

        clean: {
            dist: "<%= dirs.dest %>/"
        }

    });

    // Load any grunt plugins found in package.json.
    require("load-grunt-tasks")(grunt, {scope: "devDependencies"});
    require("time-grunt")(grunt);

    grunt.registerTask("build", [
        "clean",
        "jekyll",
        "useminPrepare",
        "copy",
        "concat",
        //"uncss",
        "cssmin",
        "uglify",
        "rev",
        "usemin",
        "htmlmin"
    ]);

    grunt.registerTask("test", [
        "build",
        "csslint",
        "jshint",
        "validation"
    ]);

    grunt.registerTask("dev", [
        "jekyll",
        "useminPrepare",
        "copy",
        "concat",
        "rev",
        "usemin"
    ]);

    grunt.registerTask("default", [
        "dev",
        "connect",
        "watch"
    ]);

};
