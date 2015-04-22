module.exports = function(grunt) {

    grunt.initConfig({
        'connect': {
            demo: {
                options: {
                    open: true,
                    keepalive: true
                }
            },
            test: {
                options: {
                    open: false,
                    keepalive: false,
                    port: 8001 
                }
            }
        },
        'replace': {
            example: {
                src: ['src/*'],
                dest: 'dist/',
                replacements: [{
                    from: 'bower_components',
                    to: '..'
                }]
            }
        },
        jasmine_nodejs: {
          options: {
           reporters: {
              console: {
                colors: true,
                cleanStack: false,
                verbose: true
              },
            }
          },
          pages: {
            specs: ["specs/ns-slider_firefox_spec.js",],
          }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-jasmine-nodejs');
    grunt.loadNpmTasks('grunt-selenium-webdriver');

    grunt.registerTask('test', ['connect:test', 'selenium_start', 'jasmine_nodejs', 'selenium_stop']);
    grunt.registerTask('build',  ['replace']);
    grunt.registerTask('deploy', ['gh-pages']);
    grunt.registerTask('server', ['connect']);

};
