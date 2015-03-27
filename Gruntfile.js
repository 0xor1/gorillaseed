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
            },
            startDevServer: {
                cmd: 'cd src/server && server.exe'
            },
            startBuildServer: {
                cmd: 'cd build/server && server.exe'
            },
            testClient: {
                cmd: 'cd test/unit/client && karma start'
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
            clientTest: ['test/unit/client/coverage/*','test/unit/client/results/*'],
            scss: ['src/client/**/*css'],
            e2e: ['test/e2e/coverage/*','test/e2e/results/*']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('buildServer', ['exec:buildServer', 'copy:serverExe']);
    grunt.registerTask('testServer', [/*TODO*/]);
    grunt.registerTask('cleanServerBuild', ['clean:serverBuild']);
    grunt.registerTask('cleanServerTest', ['clean:serverTest']);

    grunt.registerTask('buildClient', ['requirejs:compile', 'uglify:mainJsBuild', 'copy:clientIndex', 'processhtml:clientIndex', 'clean:mainJsBuild']);
    grunt.registerTask('testClient', ['exec:testClient']);
    grunt.registerTask('cleanClientBuild', ['clean:clientBuild']);
    grunt.registerTask('cleanClientTest', ['clean:clientTest']);

    grunt.registerTask('buildAll', ['buildServer', 'buildClient']);
    grunt.registerTask('testAll', ['testServer', 'testClient']);
    grunt.registerTask('cleanAllBuild', ['cleanServerBuild', 'cleanClientBuild']);
    grunt.registerTask('cleanAllTest', ['cleanServerTest', 'cleanClientTest']);

    grunt.registerTask('watchScss', [/*TODO*/]);
    grunt.registerTask('cleanScss', ['clean:scss']);

    grunt.registerTask('startDevServer', ['exec:startDevServer']);
    grunt.registerTask('startBuildServer', ['exec:startBuildServer']);

    grunt.registerTask('testE2e', [/*TODO*/]);
    grunt.registerTask('cleanE2e', ['clean:e2e']);

    grunt.registerTask('nuke', ['cleanAllBuild', 'cleanAllTest', 'cleanScss', 'cleanE2e']);

};