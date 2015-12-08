module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mean: {
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

        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-injector');
};
