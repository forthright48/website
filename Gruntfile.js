module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        mygen: {
            // configurable paths
            client: require('./bower.json').appPath || 'public',
            server: 'server',
            dist: 'dist'
        },

        wiredep: {
            target: {
                src: 'public/home.html' // point to your HTML file.
            }
        },

        injector: {
            options: {
                ignorePath: '<%= mygen.client %>/'
            },
            dependencies: {
                files: {
                    '<%= mygen.client %>/home.html': [
                        '<%= mygen.client %>/**/*.js',
                        '<%= mygen.client %>/**/*.css',
                        '!<%= mygen.client %>/bower_components/**/*.js', ///Bower files are handled by wiredep
                        '!<%= mygen.client %>/bower_components/**/*.css' ///Bower files are handled by wiredep
                    ]
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-injector');
};
