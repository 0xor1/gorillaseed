module.exports = function(grunt){

    var firstPass = true;

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
            updateSeleniumServer: {
                cmd: 'node node_modules/protractor/bin/webdriver-manager update'
            },
            startSeleniumServer: {
                cmd: 'node node_modules/protractor/bin/webdriver-manager start'
            },
            testClient: {
                cmd: 'cd test/unit/client && node ../../../node_modules/karma/bin/karma start'
            },
            testE2e: {
                cmd: 'cd test/e2e && node ../../node_modules/protractor/bin/protractor protractor.conf.js'
            },
            generateHtmlServerCoverageReport: {
                cmd: 'cd test/unit/server && go tool cover -html=coverage.out -o=coverage.html'
            },
            startAppEngine: {
                cmd: 'cd build && goapp serve'
            },
            deployAppEngine: {
                cmd: 'appcfg.py --oauth2 update build'
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
            },
            clientAppCache: {
                src: 'src/client/app.appcache',
                dest: 'build/client/app.appcache'
            },
            styleBuild: {
                src: 'src/client/style.css',
                dest: 'build/client/style.css'
            },
            appEngine: {
                src: 'src/appengine/*',
                dest: 'build/',
                flatten: true,
                expand: true
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
            styleBuild: ['build/client/style.css'],
            serverBuild: ['build/server', 'src/server/server.exe'],
            serverTest: ['test/unit/server/*'],
            clientBuild: ['build/client'],
            clientTest: ['test/unit/client/coverage/*','test/unit/client/results/*'],
            sass: ['src/client/**/*.css'],
            e2e: ['test/e2e/results/*'],
            serverTmpTestFiles: ['src/server/*.out', 'src/server/src/**/*.out'],
            appEngine: ['build/app.yaml', 'build/app.go']
        },

        concat: {
            serverTmpTestFilesResults: {
                options: {
                    separator: '\n\n'
                },
                src: ['src/server/results.out', 'src/server/src/**/results.out'],
                dest: 'test/unit/server/results.out'
            },
            serverTmpTestFilesCoverage: {
                options: {
                    process: function(src, path){
                        var lastIdx = src.lastIndexOf('\n');
                        if(lastIdx !== src.length - 1){
                            lastIdx = src.length;
                        }
                        if(firstPass) {
                            firstPass = false;
                            return src.substring(0, lastIdx);
                        }
                        return src.substring(src.indexOf('\n') + 1, lastIdx);
                    }
                },
                src: ['src/server/coverage.out', 'src/server/src/**/coverage.out'],
                dest: 'test/unit/server/coverage.out'
            }
        },

        compass: {
            dev: {
                options: {
                    outputStyle: 'compressed',
                    cssPath: 'src/client',
                    sassPath: 'src/client',
                    watch: true,
                    trace: true
                }
            }
        }
    });

    function _runServerTests(){

        var fs = require('fs'),
            cp = require('child_process'),
            exec = function(path, recursive){
                if(dirContainsTests(path)){
                    execTests(path);
                }
                if(recursive){
                    execTestsInSubDirs(path, recursive);
                }
            },
            dirContainsTests = function(path){
                var files = fs.readdirSync(path);
                for(var i = 0; i < files.length; i++){
                    var fileName = files[i];
                    if(fs.statSync(path + '/' + fileName).isFile() && fileName.indexOf('_test.go') > 0){
                        return true;
                    }
                }
                return false;
            },
            execTests = function(path){
                grunt.log.writeln('Executing go tests in: ' + path);
                try {
                    cp.execSync('cd ' + path + ' && go test -coverprofile=coverage.out > results.out');
                }catch(ex){
                    //if a test fails we need to have this try catch to ensure we continue to run the rest of the tests.
                }
            },
            execTestsInSubDirs = function(path, recursive){
                var files = fs.readdirSync(path);
                for(var i = 0; i < files.length; i++){
                    var fileName = files[i];
                    if(fs.statSync(path + '/' + fileName).isDirectory()){
                        exec(path + '/' + fileName, recursive);
                    }
                }
            };

        exec('src/server', false);
        exec('src/server/src', true);
    }

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.registerTask('buildServer', ['exec:buildServer', 'copy:serverExe']);
    grunt.registerTask('_runServerTests', _runServerTests);
    grunt.registerTask('testServer', ['_runServerTests', 'concat:serverTmpTestFilesResults', 'concat:serverTmpTestFilesCoverage', 'clean:serverTmpTestFiles', 'exec:generateHtmlServerCoverageReport']);
    grunt.registerTask('cleanServerBuild', ['clean:serverBuild']);
    grunt.registerTask('cleanServerTest', ['clean:serverTest']);

    grunt.registerTask('buildClient', ['requirejs:compile', 'uglify:mainJsBuild', 'copy:clientAppCache', 'copy:styleBuild', 'copy:clientIndex', 'processhtml:clientIndex', 'clean:mainJsBuild', 'clean:styleBuild']);
    grunt.registerTask('testClient', ['exec:testClient']);
    grunt.registerTask('cleanClientBuild', ['clean:clientBuild']);
    grunt.registerTask('cleanClientTest', ['clean:clientTest']);

    grunt.registerTask('buildAll', ['buildServer', 'buildClient']);
    grunt.registerTask('testAll', ['testServer', 'testClient']);
    grunt.registerTask('cleanAllBuild', ['cleanServerBuild', 'cleanClientBuild']);
    grunt.registerTask('cleanAllTest', ['cleanServerTest', 'cleanClientTest']);

    grunt.registerTask('watchSass', ['compass:dev']);
    grunt.registerTask('cleanSass', ['clean:sass']);

    grunt.registerTask('startDevServer', ['exec:startDevServer']);
    grunt.registerTask('startBuildServer', ['exec:startBuildServer']);

    grunt.registerTask('updateSeleniumServer', ['exec:updateSeleniumServer']);
    grunt.registerTask('startSeleniumServer', ['exec:startSeleniumServer']);

    grunt.registerTask('testE2e', ['exec:testE2e']);
    grunt.registerTask('cleanE2e', ['clean:e2e']);

    grunt.registerTask('buildAppEngine', ['copy:appEngine']);
    grunt.registerTask('cleanAppEngine', ['clean:appEngine']);
    grunt.registerTask('startAppEngine', ['exec:startAppEngine']);
    grunt.registerTask('deployAppEngine', ['exec:deployAppEngine']);

    grunt.registerTask('nuke', ['cleanAllBuild', 'cleanAllTest', 'cleanSass', 'cleanE2e', 'cleanAppEngineBuild']);

};