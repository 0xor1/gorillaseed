module.exports = function(grunt){

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        requirejs: {
            compile: {
                options: {
                    mainConfigFile: 'src/client/conf.js',
                    include: '../main',
                    findNestedDependencies: true,
                    optimize: 'none',
                    out: 'build/client/main.js',
                    onModuleBundleComplete: function (data) {
                        var fs = require('fs'),
                            amdclean = require('amdclean'),
                            outputFile = data.path;

                        fs.writeFileSync(outputFile, amdclean.clean({
                            'filePath': outputFile
                        }));
                    }
                }
            }
        },

        exec: {
            buildServer: {
                cmd: 'go build -o src/server/server.exe -v src/server/server.go'
            }
        },

        copy: {
            serverExe: {
                src: 'src/server/server.exe',
                dest: 'build/server/server.exe'
            },
            clientIndex: {
                src: 'src/client/index.html',
                dest: 'build/client/index.html'
            }
        },

        processhtml: {
            clientIndex: {
                files: {
                    'build/client/index.html': ['build/client/index.html']
                }
            }
        },

        uglify: {
            mainJsBuild: {
                files: {
                    'build/client/main.js': ['build/client/main.js']
                }
            }
        },

        clean: {
            mainJsBuild: ['build/client/main.js'],

            serverBuild: ['build/server', 'src/server/server.exe'],
            serverTest: ['test/unit/server/*'],

            clientBuild: ['build/client'],
            clientTest: ['test/unit/client/coverage/*','test/unit/client/results/*']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('buildServer', ['exec:buildServer', 'copy:serverExe']);
    grunt.registerTask('cleanServerBuild', ['clean:serverBuild']);
    grunt.registerTask('cleanServerTest', ['clean:serverTest']);

    grunt.registerTask('buildClient', ['requirejs:compile', 'uglify:mainJsBuild', 'copy:clientIndex', 'processhtml:clientIndex', 'clean:mainJsBuild']);
    grunt.registerTask('cleanClientBuild', ['clean:clientBuild']);
    grunt.registerTask('cleanClientTest', ['clean:clientTest']);

    grunt.registerTask('buildAll', ['buildServer', 'buildClient']);
    grunt.registerTask('cleanAllBuild', ['cleanServerBuild', 'cleanClientBuild']);
    grunt.registerTask('cleanAllTest', ['cleanServerTest', 'cleanClientTest']);

};