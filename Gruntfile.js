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
                    out: 'build/client/main.dev.js',
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
            buildserver: {
                cmd: 'go build -o src/server/server.exe -v src/server/server.go'
            }
        },

        copy: {
            buildserver: {
                src: 'src/server/server.exe',
                dest: 'build/server/server.exe'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['nuke']);
    grunt.registerTask('buildjs', ['requirejs']);
    grunt.registerTask('buildserver', ['exec:buildserver', 'copy:buildserver']);

};