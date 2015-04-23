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
                    open: "http://0.0.0.0:8001/_SpecRunner.html",
                    keepalive: false,
                    port: 8001 
                }
            },
            unittest: {
                options: {
                    open: "http://0.0.0.0:8001/_SpecRunner.html",
                    keepalive: true,
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
        jasmine: {
            unittest: {
              //src: ["src/ns-slider.js",],
              options: {
                specs: "tests/**/*.js",
                vendor: "bower_components/webcomponentsjs/webcomponents-lite.min.js",
                keepRunner: true,
                helpers: "tests/helpers/*.js",
                host: 'http://127.0.0.1:8001/'
              }
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

    grunt.registerTask('test', ['jasmine:unittest:build', 'connect:test', 'selenium_start', 'jasmine_nodejs', 'selenium_stop']);
    grunt.registerTask('build',  ['replace']);
    grunt.registerTask('deploy', ['gh-pages']);
    grunt.registerTask('server', ['connect']);
    grunt.registerTask('unittest', ['jasmine:unittest:build', 'connect:unittest']);

};
